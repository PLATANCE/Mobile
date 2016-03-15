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
  dispatch_async(dispatch_get_main_queue(), ^{
    void (^requestGraphAPI)(void) = ^{
      
      [[[FBSDKGraphRequest alloc] initWithGraphPath:@"me"
                                         parameters:@{@"fields" : @"id, name, email"}]
       startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection, id result, NSError *error) {
         
         if ([error.userInfo[FBSDKGraphRequestErrorGraphErrorCode] isEqual:@200]) {
           
           NSLog(@"permission error");
           
           reject(@"facebook_permission_error", @"facebook permission error.", error);
           
         } else {
           
           NSLog(@"Graph Request Success");
           
           resolve(result);
           
         }
       }];
    };
    
    
    auto currentAccessToken = [FBSDKAccessToken currentAccessToken];
    
    // 토큰이 있을 경우 별도 로그인 없이 바로 requestGraphAPI 를 실행해야 하는데, 위의 FBSDKGraphRequest가 반응하지 않음.
    // 문제 해결하기 전 까지는 계속 사용하기로 함.
    if(currentAccessToken){
     
     NSLog(@"Already Logined!");
     
     requestGraphAPI();
     
     } else {
       
       FBSDKLoginManager *login = [[FBSDKLoginManager alloc] init];
       
       [login
        logInWithReadPermissions: @[@"public_profile", @"email"]
        fromViewController:nil
        handler:^(FBSDKLoginManagerLoginResult *result, NSError *error) {
          
          if (error) {
            
            NSLog(@"Process error");
            
            reject(@"facebook_login_error", @"facebook login error.", error);
            
          } else if (result.isCancelled) {
            
            NSLog(@"Cancelled");
            
            reject(@"facebook_login_cancelled", @"facebook login cancelled.", error);
            
          } else {
            
            NSLog(@"Login success");
            
            requestGraphAPI();
          }
        }];
     }
  });
  
}
@end
