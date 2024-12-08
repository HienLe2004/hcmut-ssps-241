package com.example.demo.Repository;

import com.example.demo.Model.PaperSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PaperSettingRepository extends JpaRepository<PaperSetting,Long> {
    @Query("SELECT p FROM PaperSetting p ORDER BY p.settingDate DESC")
    Optional<PaperSetting> findLatestPaperSetting();
}
