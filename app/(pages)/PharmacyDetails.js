/* eslint-disable prettier/prettier */
import { useContext } from 'react';
import { View, Text } from 'react-native';

import { Navback } from '../../components';
import { SearchContext } from '../../context/SearchContext';

const PharmacyDetails = () => {
  const { setPharmacyID } = useContext(SearchContext);
  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-row">
        <Navback title="Pharmacy Details" onNavigate={() => setPharmacyID(null)} />
      </View>
    </View>
  );
};

export default PharmacyDetails;
