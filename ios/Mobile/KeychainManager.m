// KeychainManager.m
#import "KeychainManager.h"
#import "Mobile-Swift.h"
@implementation KeychainManager

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(getDeviceUUID,
                 getIDWithResolver : (RCTPromiseResolveBlock)resolve
                 rejecter : (RCTPromiseRejectBlock)reject)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    Util* util = [Util sharedInstance];
    if ([util hasValueForKey:@"plating_uuid"]) {
      NSString* uuid = [util stringForKey:@"plating_uuid"];
      resolve(uuid);
    } else {
      reject(@"no uuid in keychain", @"no uuid in keychain", nil);
    }
  });
}

@end