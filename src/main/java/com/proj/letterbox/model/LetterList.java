package com.proj.letterbox.model;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@RequiredArgsConstructor
@Table(name="letterList")
public class LetterList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="letterList_id")
    private int letterListId;

    @Column(name = "location")
    int location;

    @ManyToOne(targetEntity = LetterBox.class, fetch = FetchType.LAZY)
    @JoinColumn(name="letterBox_id", insertable = false, updatable = false)
    private LetterBox letterBox;

    @Column(name="letterBox_id")
    private int letterBoxId;

    @ManyToOne(targetEntity = Letter.class, fetch = FetchType.LAZY)
    @JoinColumn(name="letter_id", insertable = false, updatable = false)
    private Letter letter;

    @Column(name = "open")
    @ColumnDefault("false")
    boolean open;

    public LetterList(int location, LetterBox letterBox, Letter letter) {
        this.location = location;
        this.letterBox = letterBox;
        this.letter = letter;
    }


    public void setOpen(boolean open) {
        this.open = open;
    }
}
