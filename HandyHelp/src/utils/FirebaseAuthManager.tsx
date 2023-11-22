import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

class FirebaseAuthManager {

    
  // Sign up with email and password
  async signUp(email: string, password: string): Promise<FirebaseAuthTypes.User|null> {
    try {
      const userCredential =await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      if (user) {
        return user;
      } else {
        // Handle the case where user is null after login
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async verifyPhoneNumber(phoneNumber: string) {
    try {
      // Request a phone verification code
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);

      // Return the confirmation object
      return confirmation;
    } catch (error) {
      throw error; // Handle and propagate the error as needed
    }
  }

  // Verify the phone verification code
  async confirmVerificationCode(confirmation:any, code:any) {
    try {
      // Confirm the phone verification code
      await confirmation.confirm(code);

      // If successful, the user is now authenticated
      const user = auth().currentUser;

      return user;
    } catch (error) {
      throw error; // Handle and propagate the error as needed
    }
  }

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<FirebaseAuthTypes.User|null> {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password); 
      const user = userCredential.user;
      if (user) {
        return user;
      } else {
        // Handle the case where user is null after login
        return null;
      }
    } catch (error) {
      throw error;
    }
  }



  // Sign out the currently authenticated user
  async signOut(): Promise<void> {
    try {
      await auth().signOut();
    } catch (error) {
      throw error;
    }
  }

  // Send a password reset email
  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (error) {
      throw error;
    }
  }

  // Get the current user (if any)
  getCurrentUser() {
    return auth().currentUser;
  }

  // Listen for changes in user authentication state
  onAuthStateChanged(callback: (user: any) => void) {
    return auth().onAuthStateChanged(callback);
  }
}

export default new FirebaseAuthManager();


