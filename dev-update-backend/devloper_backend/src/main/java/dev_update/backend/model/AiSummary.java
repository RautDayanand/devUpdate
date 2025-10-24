package dev_update.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Entity
@Table(name = "ai_summaries")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class AiSummary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "release_id", nullable = false)
    private Release release;

    private String summary;           // AI-generated summary text
    private LocalDateTime createdAt;  // timestamp of creation
    private String modelMeta;         // info about AI model
}