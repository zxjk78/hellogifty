package com.a705.hellogifty.api.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;

@RestController
@RequestMapping("/image")
public class ImageController {

    @Value("${image.gifticon.path}")
    String gifticonImagePath;

    @Value("${image.gifticon-crop.path}")
    String gifticonCroppedImagePath;

    @Value("${image.brand.path}")
    String brandImagePath;


    @ResponseBody
    @GetMapping("/gifticon")
    public byte[] showGifticonImage(@RequestParam("path") String filename) throws IOException {
        System.out.println(filename);
        String path = System.getProperty("user.dir"); // 현재 디렉토리 가져오기
        File file = new File( path+gifticonImagePath + filename);

        Resource resource = new UrlResource("file:"+file.getPath());
        InputStream is = resource.getInputStream();
        byte [] contents = is.readAllBytes();

        byte [] encoded = Base64Utils.encode(contents);
        return encoded;

    }

    @ResponseBody
    @GetMapping("/gifticon-cropped")
    public byte[] showCroppedGifticonImage(@RequestParam("path") String filename) throws IOException {
        System.out.println(filename);
        String path = System.getProperty("user.dir"); // 현재 디렉토리 가져오기
        File file = new File( path+gifticonCroppedImagePath + filename);

        Resource resource = new UrlResource("file:"+file.getPath());
        InputStream is = resource.getInputStream();
        byte [] contents = is.readAllBytes();

        byte [] encoded = Base64Utils.encode(contents);
        return encoded;
    }

    //    @ResponseBody
    @GetMapping("/brand")
    public byte[] showBrandImage(@RequestParam("path") String filename) throws IOException {
        System.out.println(filename);
        String path = System.getProperty("user.dir"); // 현재 디렉토리 가져오기
//        System.out.println("path = " + path);
        File file = new File( path+brandImagePath + filename);

//        System.out.println("path+brandImagePath + filename = " + path+brandImagePath + filename);
        Resource resource = new UrlResource("file:"+file.getPath());
        InputStream is = resource.getInputStream();
        byte [] contents = is.readAllBytes();

        byte [] encoded = Base64Utils.encode(contents);
        return encoded;

    }
}
