package dev_update.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev_update.backend.model.Release;
import dev_update.backend.model.Tech;
import dev_update.backend.repo.ReleaseRepository;
import dev_update.backend.repo.TechRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Service
public class AutoUpdateService {

    @Autowired
    private TechRepository techRepo;

    @Autowired
    private ReleaseRepository relRepo;

    private final WebClient webClient = WebClient.create();
    private final ObjectMapper mapper = new ObjectMapper();

    @Scheduled(fixedRate = 3600000) // runs every 1 hour
    public void scheduledFetchUpdates() {
        autoFetchUpdates();
    }

    public void autoFetchUpdates() {
        List<Tech> techList = techRepo.findAll();

        for (Tech tech : techList) {
            try {
                // Fetch latest release info asynchronously but block until done
                String json = webClient.get()
                        .uri(tech.getApiUrl())
                        .retrieve()
                        .bodyToMono(String.class)
                        .block(); // blocking here since method is synchronous

                JsonNode root = mapper.readTree(json);

                // Extract data from npm API
                String version = root.path("dist-tags").path("latest").asText();
                String publishedAtStr = root.path("time").path(version).asText();

                String changelog = root.path("rawChangelog").asText("");
                String diffUrl = root.path("diffUrl").asText("");

                // Convert ISO 8601 with Z to LocalDateTime in UTC
                Instant instant = Instant.parse(publishedAtStr);
                LocalDateTime publishedAt = LocalDateTime.ofInstant(instant, ZoneId.of("UTC"));

                // Check if release already exists
                Release latest = relRepo.findTopByTechOrderByPublishedAtDesc(tech);
                if (latest == null || !latest.getVersion().equals(version)) {
                    Release newRel = new Release();
                    newRel.setVersion(version);
                    newRel.setRawChangelog(changelog);
                    newRel.setDiffUrl(diffUrl);
                    newRel.setPublishedAt(publishedAt);
                    newRel.setTech(tech);
                    newRel.setFetchedAt(LocalDateTime.now(ZoneId.of("UTC")));

                    relRepo.save(newRel);
                    System.out.println("✅ New release added for " + tech.getName() + ": " + version);
                }

            } catch (Exception e) {
                System.err.println("❌ Error updating " + tech.getName() + ": " + e.getMessage());
            }
        }
    }
}
