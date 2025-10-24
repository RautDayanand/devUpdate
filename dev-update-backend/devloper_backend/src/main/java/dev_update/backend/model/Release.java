package dev_update.backend.model;



import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

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
    private Tech tech;            // link to Tech entity

    private String version;
    private LocalDateTime publishedAt;
    private String rawChangelog;   // full changelog text
    private String diffUrl;        // link to diff if available
    private LocalDateTime fetchedAt;
}


