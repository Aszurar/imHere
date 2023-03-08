import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '../Button';
import { styles } from './styles';

type IParticipantProps = {
  name: string;
}

interface ParticipantItemListProps {
  item: IParticipantProps;
  handleRemoveParticipant: (name: string) => void;
}

export function Participant({ item, handleRemoveParticipant }: ParticipantItemListProps) {
  const { name } = item
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail' >{name}</Text>
      </View>
      <Button deleteIcon onPress={() => handleRemoveParticipant(name)} />
    </View >
  );
}