//
//  RCTKakaoManager.m
//  Mobile
//
//  Created by echo on 2016. 3. 14..
//  Copyright © 2016년 Facebook. All rights reserved.
//

#import "KakaoManager.h"
#import <KakaoOpenSDK/KakaoOpenSDK.h>

@implementation KakaoManager

RCT_EXPORT_MODULE();


RCT_REMAP_METHOD(login,
                 loginWithResolver : (RCTPromiseResolveBlock)resolve
                 rejecter : (RCTPromiseRejectBlock)reject)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    // ensure old session was closed
    [[KOSession sharedSession] close];
    
    [[KOSession sharedSession] openWithCompletionHandler:^(NSError *error) {
      if ([[KOSession sharedSession] isOpen]) {
        // login success
        NSLog(@"login succeeded.");
        
        [KOSessionTask meTaskWithCompletionHandler:^(KOUser* result, NSError *error) {
          if (result) {
            NSLog(@"kakao getUserInfo succeeded.");
            // success
            resolve(@{@"ID": result.ID,
                      @"properties": result.properties});
          } else {
            // failed
            NSLog(@"kakao getUserInfo failed.");
            reject(@"kakao getUserInfo fail", @"getUserInfo failed. need debuging.", error);
          }
        }];
        
      } else {
        // failed
        NSLog(@"login failed.");
        reject(@"kakao login fail", @"login failed. need debuging.", error);
      }
    }];
  });
}

RCT_EXPORT_METHOD(openKakaoTalkAppLink : (NSString *)title label : (NSString *)label) {
  dispatch_async(dispatch_get_main_queue(), ^{
    KakaoTalkLinkAction *iosLinkAction = [KakaoTalkLinkAction createAppAction:KakaoTalkLinkActionOSPlatformIOS devicetype:KakaoTalkLinkActionDeviceTypePhone execparam:nil];
    KakaoTalkLinkAction *androidLinkAction = [KakaoTalkLinkAction createAppAction:KakaoTalkLinkActionOSPlatformAndroid devicetype:KakaoTalkLinkActionDeviceTypePhone execparam:nil];
    
    KakaoTalkLinkObject *appLink = [KakaoTalkLinkObject createAppButton:title actions:@[iosLinkAction, androidLinkAction]];
    
    KakaoTalkLinkObject *linkLabel = [KakaoTalkLinkObject createLabel:label];
    
    [KOAppCall openKakaoTalkAppLink:@[linkLabel, appLink]];
  });
}

RCT_EXPORT_METHOD(openKakaoTalkToCustomerService) {
  dispatch_async(dispatch_get_main_queue(), ^{
    NSURL *url = [NSURL URLWithString:[@"kakaoplus://plusfriend/friend/@플레이팅" stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
    
    if ([[UIApplication sharedApplication] canOpenURL:url]) {
      [[UIApplication sharedApplication] openURL:url];
    } else {
      NSURL *alternateUrl = [NSURL URLWithString:[@"http://goto.kakao.com/@플레이팅" stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
      
      [[UIApplication sharedApplication] openURL:alternateUrl];
    }
  });
}

RCT_REMAP_METHOD(getID,
                 getIDWithResolver : (RCTPromiseResolveBlock)resolve
                 rejecter : (RCTPromiseRejectBlock)reject)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    // ensure old session was closed
    if ([[KOSession sharedSession] isOpen]) {
      // login success
      NSLog(@"login succeeded.");
      
      [KOSessionTask meTaskWithCompletionHandler:^(KOUser* result, NSError *error) {
        if (result) {
          NSLog(@"kakao getUserInfo succeeded.");
          // success
          resolve(result.ID);
        } else {
          // failed
          NSLog(@"kakao getUserInfo failed.");
          reject(@"kakao getUserInfo fail", @"getUserInfo failed. need debuging.", error);
        }
      }];
      
    } else {
      // failed
      NSLog(@"login failed.");
      reject(@"kakao login fail", @"login failed. need debuging.", NULL);
    }
  });
}

@end
