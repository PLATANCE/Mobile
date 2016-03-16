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
                  loginWithResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
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
            reject(@"kakao_getUserInfo_fail", @"getUserInfo failed. need debuging.", error);
          }
        }];
        
      } else {
        // failed
        NSLog(@"login failed.");
        reject(@"kakao_login_fail", @"login failed. need debuging.", error);
      }
    }];
  });
}

@end
