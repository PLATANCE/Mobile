//
//  FacebookManager.m
//  Mobile
//
//  Created by echo on 2016. 3. 15..
//  Copyright © 2016년 Facebook. All rights reserved.
//

#import "FacebookManager.h"
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <FBSDKLoginKit/FBSDKLoginKit.h>
@implementation FacebookManager

RCT_EXPORT_MODULE();


RCT_REMAP_METHOD(login,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  FBSDKLoginManager *login = [[FBSDKLoginManager alloc] init];
  [login
   logInWithReadPermissions: @[@"public_profile"]
   fromViewController:nil
   handler:^(FBSDKLoginManagerLoginResult *result, NSError *error) {
     if (error) {
       NSLog(@"Process error");
       reject(@"facebook_login_error", @"facebook login error.", error);
     } else if (result.isCancelled) {
       NSLog(@"Cancelled");
       reject(@"facebook_login_cancelled", @"facebook login cancelled.", error);
     } else {
       NSLog(@"Logged in");
       resolve(NULL);
     }
   }];
}
@end
