//
//  Util.swift
//  Plating2
//
//  Created by Terry on 13/10/2015.
//  Copyright © 2015 Plating, Inc. All rights reserved.
//

import Foundation
import UIKit

@objc class Util : NSObject {
  
  static let KeyOfLastNoticeAlertDate = "LastNoticeAlertDate";
  
  let SecMatchLimit: String! = kSecMatchLimit as String
  let SecReturnData: String! = kSecReturnData as String
  let SecValueData: String! = kSecValueData as String
  let SecAttrAccessible: String! = kSecAttrAccessible as String
  let SecClass: String! = kSecClass as String
  let SecAttrGeneric: String! = kSecAttrGeneric as String
  let SecAttrAccount: String! = kSecAttrAccount as String
  let SecAttrService: String! = kSecAttrService as String
  let SecAttrAccessGroup: String! = kSecAttrAccessGroup as String
  
  var serviceName: String = ""
  var accessGroup: String = ""
  
  
  static let sharedInstance = Util()
  
  //  Copyright (c) 2014 jasonrendel. All rights reserved.
  func hasValueForKey(keyName: String) -> Bool {
    let keychainData: NSData? = self.dataForKey(keyName)
    if let _ = keychainData {
      return true
    } else {
      return false
    }
  }
  //  Copyright (c) 2014 jasonrendel. All rights reserved.
  func stringForKey(keyName: String) -> String? {
    let keychainData: NSData? = self.dataForKey(keyName)
    var stringValue: String?
    if let data = keychainData {
      stringValue = NSString(data: data, encoding: NSUTF8StringEncoding) as String?
    }
    
    return stringValue
  }
  
  func setString(value: String, forKey keyName: String) -> Bool {
    if let data = value.dataUsingEncoding(NSUTF8StringEncoding) {
      return self.setData(data, forKey: keyName)
    } else {
      return false
    }
  }
  func setData(value: NSData, forKey keyName: String) -> Bool {
    var keychainQueryDictionary: [String:AnyObject] = self.setupKeychainQueryDictionaryForKey(keyName)
    
    keychainQueryDictionary[SecValueData] = value
    
    // Protect the keychain entry so it's only valid when the device is unlocked
    keychainQueryDictionary[SecAttrAccessible] = kSecAttrAccessibleWhenUnlocked
    
    let status: OSStatus = SecItemAdd(keychainQueryDictionary, nil)
    
    if status == errSecSuccess {
      return true
    } else if status == errSecDuplicateItem {
      return self.updateData(value, forKey: keyName)
    } else {
      return false
    }
  }
  func updateData(value: NSData, forKey keyName: String) -> Bool {
    let keychainQueryDictionary: [String:AnyObject] = self.setupKeychainQueryDictionaryForKey(keyName)
    let updateDictionary = [SecValueData:value]
    
    // Update
    let status: OSStatus = SecItemUpdate(keychainQueryDictionary, updateDictionary)
    
    if status == errSecSuccess {
      return true
    } else {
      return false
    }
  }
  
  
  func dataForKey(keyName: String) -> NSData? {
    var keychainQueryDictionary = self.setupKeychainQueryDictionaryForKey(keyName)
    var result: AnyObject?
    
    // Limit search results to one
    keychainQueryDictionary[SecMatchLimit] = kSecMatchLimitOne
    
    // Specify we want NSData/CFData returned
    keychainQueryDictionary[SecReturnData] = kCFBooleanTrue
    
    // Search
    let status = withUnsafeMutablePointer(&result) {
      SecItemCopyMatching(keychainQueryDictionary, UnsafeMutablePointer($0))
    }
    
    return status == noErr ? result as? NSData : nil
  }
  func setupKeychainQueryDictionaryForKey(keyName: String) -> [String:AnyObject] {
    // Setup dictionary to access keychain and specify we are using a generic password (rather than a certificate, internet password, etc)
    var keychainQueryDictionary: [String:AnyObject] = [SecClass:kSecClassGenericPassword]
    
    // Uniquely identify this keychain accessor
    keychainQueryDictionary[SecAttrService] = serviceName
    
    // Set the keychain access group if defined
    if !accessGroup.isEmpty {
      keychainQueryDictionary[SecAttrAccessGroup] = accessGroup
    }
    
    // Uniquely identify the account who will be accessing the keychain
    let encodedIdentifier: NSData? = keyName.dataUsingEncoding(NSUTF8StringEncoding)
    
    keychainQueryDictionary[SecAttrGeneric] = encodedIdentifier
    
    keychainQueryDictionary[SecAttrAccount] = encodedIdentifier
    
    return keychainQueryDictionary
  }
}