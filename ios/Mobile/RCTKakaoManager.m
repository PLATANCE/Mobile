//
//  RCTKakaoManager.m
//  Mobile
//
//  Created by echo on 2016. 3. 14..
//  Copyright © 2016년 Facebook. All rights reserved.
//

#import "RCTKakaoManager.h"
#import <KakaoOpenSDK/KakaoOpenSDK.h>

@implementation RCTKakaoManager

RCT_REMAP_METHOD(onLogin,
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  // ensure old session was closed
  [[KOSession sharedSession] close];
  
  [[KOSession sharedSession] openWithCompletionHandler:^(NSError *error) {
    if ([[KOSession sharedSession] isOpen]) {
      // login success
      NSLog(@"login succeeded.");
    } else {
      // failed
      NSLog(@"login failed.");
    }
  }];
}

RCT_EXPORT_MODULE();

@end
