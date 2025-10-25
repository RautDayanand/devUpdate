package dev_update.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Entity
@Table(name = "releases")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class Release {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "tech_id", nullable = false)
    private Tech tech;

    private String version;

    // Changed to LocalDateTime in UTC
    private LocalDateTime publishedAt;

    private String rawChangelog;
    private String diffUrl;

    private LocalDateTime fetchedAt;
}
