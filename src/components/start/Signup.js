import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const Signup = ({ onSignup }) => {
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [inputText, setInputText] = useState('');
  const [selectedPersonality, setSelectedPersonality] = useState('');

  const handleSignup = async () => {
    const response = await onSignup({
      university: selectedUniversity,
      role: selectedRole,
      input: inputText,
      personality: selectedPersonality,
    });

    if (response.success) {
      Alert.alert('Signup successful');
    } else {
      Alert.alert('Signup failed');
    }
  };

  return (
    <View>
      <Text>University</Text>
      <TextInput
        testID="university-input"
        value={selectedUniversity}
        onChangeText={setSelectedUniversity}
      />
      <Text>Role</Text>
      <TextInput
        testID="role-input"
        value={selectedRole}
        onChangeText={setSelectedRole}
      />
      <Text>Name</Text>
      <TextInput
        testID="name-input"
        value={inputText}
        onChangeText={setInputText}
      />
      <Text>Personality</Text>
      <TextInput
        testID="personality-input"
        value={selectedPersonality}
        onChangeText={setSelectedPersonality}
      />
      <Button title="Signup" testID="signup-button" onPress={handleSignup} />
    </View>
  );
};

export default Signup;
