package dev_update.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Entity
@Table(name = "techs")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class Tech {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;           // Tool name, e.g., React
    private String apiUrl;   // API endpoint to fetch latest version info
    private String packageId;      // e.g., npm package name
    private String primarySource;  // GitHub / official repo
    private String website;        // official website
    private String description;    // optional: short description
    private String logoUrl;        // optional: URL to logo


}
