/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "CodePush.h"
#import <Fabric/Fabric.h>
#import <Crashlytics/Crashlytics.h>

#import "RCTRootView.h"
#import "RCTPushNotificationManager.h"

#import <KakaoOpenSDK/KakaoOpenSDK.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>

#import "AppsFlyerTracker.h"
#import "Mixpanel.h"
#import "CodePush.h"
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSLog(@"didFinishLaunchingWithOptions called");
  [Fabric with:@[[Crashlytics class]]];
  [AppsFlyerTracker sharedTracker].appsFlyerDevKey = @"5aJTmR8RGtTwQBiia8vPzh";
  [AppsFlyerTracker sharedTracker].appleAppID = @"1031812751";
  
  NSURL *jsCodeLocation;
  
  /**
   * Loading JavaScript code - uncomment the one you want.
   *
   * OPTION 1
   * Load from development server. Start the server from the repository root:
   *
   * $ npm start
   *
   * To run on device, change `localhost` to the IP address of your computer
   * (you can get this by typing `ifconfig` into the terminal and selecting the
   * `inet` value under `en0:`) and make sure your computer and iOS device are
   * on the same Wi-Fi network.
   */
    
#ifdef DEBUG
    jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
#else
    jsCodeLocation = [CodePush bundleURL];
#endif
  
  /**
   * OPTION 2
   * Load from pre-bundled file on disk. The static bundle is automatically
   * generated by "Bundle React Native code and images" build step.
   */
  
     //jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"Mobile"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];
  /*
   * APNS
   */
#ifdef __IPHONE_8_0
  //Right, that is the point
  UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:(UIUserNotificationTypeAlert | UIUserNotificationTypeBadge | UIUserNotificationTypeSound) categories:nil];
  [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
#else
  //register to receive notifications
  UIRemoteNotificationType myTypes = UIRemoteNotificationTypeBadge | UIRemoteNotificationTypeAlert | UIRemoteNotificationTypeSound;
  [[UIApplication sharedApplication] registerForRemoteNotificationTypes:myTypes];
#endif
  
  [[AppsFlyerTracker sharedTracker] trackAppLaunch];
  [AppsFlyerTracker sharedTracker].delegate = self;

  return YES;
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
  if ([KOSession isKakaoAccountLoginCallback:url]) {
    return [KOSession handleOpenURL:url];
  } else {
    return [[FBSDKApplicationDelegate sharedInstance] application:application
                                                          openURL:url
                                                sourceApplication:sourceApplication
                                                       annotation:annotation
            ];
    
  }
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
  NSLog(@"applicationDidBecomeActive called");
  [KOSession handleDidBecomeActive];
  [FBSDKAppEvents activateApp];

  // Track Installs, updates & sessions(app opens) (You must include this API to enable tracking)
  
  
}

// Required to register for notifications
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
  [RCTPushNotificationManager didRegisterUserNotificationSettings:notificationSettings];
}
// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  [RCTPushNotificationManager didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
  Mixpanel *mixpanel = [Mixpanel sharedInstance];
  [mixpanel.people addPushDeviceToken:deviceToken];
}
// Required for the notification event.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)notification
{
  [RCTPushNotificationManager didReceiveRemoteNotification:notification];
}

-(void)onConversionDataReceived:(NSDictionary*) installData {
  NSLog(@"onConversionDataReceived called");
  
  NSUserDefaults *preferences = [NSUserDefaults standardUserDefaults];

  NSString *hasInstalledKey = @"hasinstalled";

  if([preferences objectForKey:hasInstalledKey] == nil) {

    NSInteger const hasInstalledValue = 1;
    [preferences setInteger:hasInstalledValue forKey: hasInstalledKey];

    NSLog(@"onConversionDataReceived has not key");

    id status = [installData objectForKey:@"af_status"];
    if([status isEqualToString:@"Non-organic"]) {
      id sourceID = [installData objectForKey:@"media_source"];
      id campaign = [installData objectForKey:@"campaign"];
      // Initialize a Mixpanel Instance 
      Mixpanel *mixpanel = [Mixpanel sharedInstance];
      // Register the attribution properties as Super Properties
      [mixpanel registerSuperProperties:@{@"campaign": campaign, @"media_source": sourceID}];
      // Track An app-install event which will include the campaign super properties
      [mixpanel track:@"App Install"];
    } else if([status isEqualToString:@"Organic"]) {
      NSLog(@"onConversionDataReceived called Organic");
      // Initialize a Mixpanel Instance
      Mixpanel *mixpanel = [Mixpanel sharedInstance];
      // Register the Attribution Properties as Super Properties
      [mixpanel registerSuperProperties:@{@"campaign": @"Organic", @"media_source": @"Organic"}];
      // Track An app-install event which will include Organic Super Properties
      [mixpanel track:@"App Install"];
    }
  }
  
  
}
-(void)onConversionDataRequestFailure:(NSError *) error {
    NSLog(@"%@",error);
}
@end

//[KOSession sharedSession].accessToken

