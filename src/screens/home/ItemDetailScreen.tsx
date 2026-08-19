import React, { useEffect, useMemo } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppDispatch, RootState } from '../../redux/store';
import { fetchItemById, resetInterestFeedback, submitItemInterest } from '../../redux/itemsSlice';
import type { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import AppButton from '../../components/Button/AppButton';
import LoadingView from '../../components/LoadingView';
import ErrorView from '../../components/ErrorView';
import { isValidItemId } from '../../utils/validation';

type Props = NativeStackScreenProps<HomeStackParamList, 'ItemDetail'>;

const ItemDetailScreen: React.FC<Props> = ({ route }) => {
  const { itemId } = route.params;
  const dispatch = useDispatch<AppDispatch>();

  const { selectedItem, selectedItemLoading, selectedItemError, submittingInterest, interestError, interestSuccess } =
    useSelector((state: RootState) => state.items);

  useEffect(() => {
    dispatch(resetInterestFeedback());
    if (isValidItemId(itemId)) {
      dispatch(fetchItemById(itemId));
    }
  }, [dispatch, itemId]);

  const priceText = useMemo(() => {
    if (!selectedItem) {
      return '---';
    }

    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(selectedItem.price);
  }, [selectedItem]);

  const handleSubmitInterest = () => {
    if (!isValidItemId(itemId)) {
      Alert.alert('Validation', 'Please provide a valid item ID.');
      return;
    }

    dispatch(submitItemInterest(itemId));
  };

  useEffect(() => {
    if (interestSuccess) {
      // Alert.alert('Success', interestSuccess);
    }
  }, [interestSuccess]);

  if (selectedItemLoading) {
    return <LoadingView message="Loading item details..." />;
  }

  if (selectedItemError) {
    return <ErrorView message={selectedItemError} />;
  }

  if (!selectedItem) {
    return <ErrorView message="Item details were not found." />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{selectedItem.title}</Text>
        <Text style={styles.category}>{selectedItem.category}</Text>

        <View style={styles.infoCard}>
          <InfoRow label="Area Code" value={selectedItem.areaCode} />
          <InfoRow label="Price" value={`₹${priceText}`} />
          <InfoRow label="Status" value={selectedItem.status} />
          <InfoRow label="City" value={selectedItem.city ?? 'N/A'} />
          <InfoRow label="Bedrooms" value={selectedItem.bedrooms ? String(selectedItem.bedrooms) : 'N/A'} />
          <InfoRow label="Bathrooms" value={selectedItem.bathrooms ? String(selectedItem.bathrooms) : 'N/A'} />
        </View>

        <View style={styles.descriptionBox}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{selectedItem.description}</Text>
        </View>

        {interestError ? <Text style={styles.errorText}>{interestError}</Text> : null}
        {interestSuccess ? <Text style={styles.successText}>{interestSuccess}</Text> : null}

        <AppButton
          title={submittingInterest ? 'Submitting...' : 'Submit Interest'}
          onPress={handleSubmitInterest}
          disabled={submittingInterest}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: 16,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
  },
  category: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eef2f7',
  },
  label: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '600',
  },
  value: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '700',
    flexShrink: 1,
    textAlign: 'right',
    marginLeft: 12,
  },
  descriptionBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#334155',
  },
  errorText: {
    // marginTop: 16,
    color: '#b91c1c',
    fontSize: 14,
    fontWeight: '600',
  },
  successText: {
    // marginTop: 16,
    color: '#15803d',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ItemDetailScreen;
