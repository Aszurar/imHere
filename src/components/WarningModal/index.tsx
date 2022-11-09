import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import theme from '../../theme';
import { styles } from './styles';


interface WarningModalProps {
  title: string;
  subtitle: string;
  onCloseModal(): void;
  confirmButton?(): void;
  footerWithDeteteButton?: boolean;
}

export function WarningModal({ title, subtitle, confirmButton, onCloseModal, footerWithDeteteButton = false }: WarningModalProps) {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <View style={styles.footer}>
          {
            footerWithDeteteButton ? (
              <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={onCloseModal} style={styles.button}>
                  <Text style={[styles.buttonText, { color: theme.COLORS.DELETE }]}>não</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={(() => { confirmButton!(); onCloseModal() })} style={styles.button}>
                  <Text style={[styles.buttonText, { color: theme.COLORS.SUCCESS }]}>sim</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={onCloseModal} style={styles.button}>
                <Text style={[styles.buttonText, { color: theme.COLORS.TEXT_PRIMARY }]}>ok</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </View>
    </View>
  );
}