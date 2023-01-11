package com.proj.letterbox.service;

import com.proj.letterbox.model.Letter;
import com.proj.letterbox.model.LetterBox;
import com.proj.letterbox.model.User;
import com.proj.letterbox.repository.LetterBoxRepository;
import com.proj.letterbox.repository.LetterRepository;
import com.proj.letterbox.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class LetterService {
    @Autowired
    LetterRepository letterRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    LetterBoxRepository letterBoxRepository;
    @Autowired
    UserService userService;
    @Autowired
    LetterBoxService letterBoxService;

    public Letter saveLetter(HttpServletRequest request, int letterboxIdx, Letter letter) {
        User user = userService.getUser(request);
        letter.setUser(user);
        letter.setLetterId(letterboxIdx);
        letterRepository.save(letter);
        return letter;
    }

    public Letter getLetter(HttpServletRequest request, int letterboxIdx, int letterIdx) {
        User user = userService.getUser(request);
        return null;
        //TODO getLetter 부분 고민 후 작성할 것...!!
    }

}