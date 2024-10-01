import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../../components/Pixel/Index';
import { COLORS } from '../../../constants';
import fontFamily from '../../../constants/fontFamily';

const categories = [
    { id: '1', name: 'Astrologer', icon: require('../../../assets/images/post.png') },
    { id: '2', name: 'Assistant', icon: require('../../../assets/images/rocket.png') },
    { id: '3', name: 'Makeup', icon: require('../../../assets/images/verify.png') },
    { id: '4', name: 'Mehndi', icon: require('../../../assets/images/post.png') },
    { id: '5', name: 'Photogra', icon: require('../../../assets/images/rocket.png') },
];

const workers = [
    {
        id: '1',
        name: 'Arthur',
        country: 'France',
        flag: require('../../../assets/flags/france.png'),
        profileImage: require('../../../assets/images/user.jpg'),
        categoryId: '1',
    },
    {
        id: '2',
        name: 'Leslie',
        country: 'Germany',
        flag: require('../../../assets/flags/germany.png'),
        profileImage: require('../../../assets/images/user1.jpg'),
        categoryId: '2',
    },
    {
        id: '3',
        name: 'Sophia',
        country: 'Spain',
        flag: require('../../../assets/flags/spain.png'),
        profileImage: require('../../../assets/images/user4.jpg'),
        categoryId: '3',
    },
    {
        id: '4',
        name: 'Liam',
        country: 'United States',
        flag: require('../../../assets/flags/italy.png'),
        profileImage: require('../../../assets/images/user.jpg'),
        categoryId: '4',
    },
    {
        id: '5',
        name: 'Emma',
        country: 'Italy',
        flag: require('../../../assets/flags/italy.png'),
        profileImage: require('../../../assets/images/user1.jpg'),
        categoryId: '5',
    },
    {
        id: '6',
        name: 'Lucas',
        country: 'Brazil',
        flag: require('../../../assets/flags/serbia.png'),
        profileImage: require('../../../assets/images/user4.jpg'),
        categoryId: '1',
    },
    {
        id: '7',
        name: 'Noah',
        country: 'Netherlands',
        flag: require('../../../assets/flags/netharlands.png'),
        profileImage: require('../../../assets/images/user.jpg'),
        categoryId: '2',
    },
    {
        id: '8',
        name: 'Olivia',
        country: 'United Kingdom',
        flag: require('../../../assets/flags/portugal.png'),
        profileImage: require('../../../assets/images/user1.jpg'),
        categoryId: '3',
    },
    {
        id: '9',
        name: 'Mia',
        country: 'Canada',
        flag: require('../../../assets/flags/hungary.png'),
        profileImage: require('../../../assets/images/user4.jpg'),
        categoryId: '4',
    },
    {
        id: '10',
        name: 'Elijah',
        country: 'South Africa',
        flag: require('../../../assets/flags/saudi-arabia.png'),
        profileImage: require('../../../assets/images/user.jpg'),
        categoryId: '5',
    },
    {
        id: '11',
        name: 'Sophia',
        country: 'Australia',
        flag: require('../../../assets/flags/serbia.png'),
        profileImage: require('../../../assets/images/user1.jpg'),
        categoryId: '1',
    },
    {
        id: '12',
        name: 'James',
        country: 'New Zealand',
        flag: require('../../../assets/flags/russia.png'),
        profileImage: require('../../../assets/images/user4.jpg'),
        categoryId: '2',
    },
    {
        id: '13',
        name: 'Isabella',
        country: 'Japan',
        flag: require('../../../assets/flags/france.png'),
        profileImage: require('../../../assets/images/user.jpg'),
        categoryId: '3',
    },
    {
        id: '14',
        name: 'Henry',
        country: 'Germany',
        flag: require('../../../assets/flags/germany.png'),
        profileImage: require('../../../assets/images/user1.jpg'),
        categoryId: '4',
    },
    {
        id: '15',
        name: 'Oliver',
        country: 'France',
        flag: require('../../../assets/flags/france.png'),
        profileImage: require('../../../assets/images/user4.jpg'),
        categoryId: '5',
    },
    {
        id: '16',
        name: 'Emily',
        country: 'Mexico',
        flag: require('../../../assets/flags/germany.png'),
        profileImage: require('../../../assets/images/user.jpg'),
        categoryId: '1',
    },
    {
        id: '17',
        name: 'Charlotte',
        country: 'South Korea',
        flag: require('../../../assets/flags/russia.png'),
        profileImage: require('../../../assets/images/user1.jpg'),
        categoryId: '2',
    },
    {
        id: '18',
        name: 'Amelia',
        country: 'Switzerland',
        flag: require('../../../assets/flags/spain.png'),
        profileImage: require('../../../assets/images/user4.jpg'),
        categoryId: '3',
    },
    {
        id: '19',
        name: 'William',
        country: 'Argentina',
        flag: require('../../../assets/flags/united-states.png'),
        profileImage: require('../../../assets/images/user.jpg'),
        categoryId: '4',
    },
    {
        id: '20',
        name: 'Mike',
        country: 'Argentina',
        flag: require('../../../assets/flags/united-states.png'),
        profileImage: require('../../../assets/images/user4.jpg'),
        categoryId: '5',
    },
];


const CategoriesScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Function to handle category selection
    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(prevCategory => (prevCategory === categoryId ? null : categoryId));
    };

    // Filter workers based on selected category and search text
    const filteredWorkers = workers.filter(worker => {
        const matchesCategory = !selectedCategory || worker.categoryId === selectedCategory;
        const matchesSearch = worker.name.toLowerCase().includes(searchText.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.categoryItem, selectedCategory === item.id && styles.selectedCategory]}
            onPress={() => handleCategorySelect(item.id)}
        >
            <Image source={item.icon} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderWorkerItem = ({ item }) => (
        <View style={styles.workerItem}>
            <View style={styles.imageContainer}>
                <Image source={item.profileImage} style={styles.profileImage} />
                <Image source={item.flag} style={styles.flagIcon} />
            </View>
            <Text style={styles.workerName}>{item.name}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View>
                {/* Header Section */}
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Ionicons name="reorder-three-outline" size={hp(3.6)} color={COLORS.darkgray} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="notifications-outline" size={hp(3.2)} color={COLORS.darkgray} />
                    </TouchableOpacity>
                </View>

                {/* Categories Carousel */}
                <FlatList
                    data={categories}
                    renderItem={renderCategoryItem}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesContainer}
                />

                {/* Search Bar */}
                <View style={styles.searchBarContainer}>
                    <Ionicons name="search-outline" size={hp(2.6)} color={COLORS.darkgray1} style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search"
                        placeholderTextColor={COLORS.darkgray1}
                        value={searchText}
                        onChangeText={setSearchText}
                        style={styles.searchInput}
                    />
                    <TouchableOpacity style={styles.microphoneIcon}>
                        <MaterialCommunityIcons name="microphone-outline" size={hp(2.9)} color={COLORS.darkgray} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.soundMixButton}>
                        <Entypo name="sound-mix" size={hp(2.6)} color={COLORS.darkgray} />
                    </TouchableOpacity>
                </View>

                {/* Worker Profiles Grid */}
                <FlatList
                    data={filteredWorkers}
                    renderItem={renderWorkerItem}
                    keyExtractor={item => item.id}
                    numColumns={4}
                    contentContainerStyle={styles.workersGrid}
                />
            </View>
        </SafeAreaView>
    );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: wp(2.6),
        paddingHorizontal: wp(5.5),
        height: hp(5.8),
    },
    categoriesContainer: {
        paddingVertical: hp(1.3),
        backgroundColor: '#eee8e2',
        width: wp(100),
        paddingHorizontal: wp(0.6)
    },
    categoryItem: {
        alignItems: 'center',
        paddingHorizontal: wp(1.4),
    },
    categoryIcon: {
        width: wp(17),
        height: wp(17),
        borderRadius: wp(17),
    },
    categoryText: {
        marginTop: hp(0.5),
        fontSize: hp(1.3),
        color: '#000',
    },
    selectedCategory: {
        backgroundColor: COLORS.gray,
        borderRadius: wp(2),
    },
    searchBarContainer: {
        width: '80%',
        marginVertical: hp(1.3),
        marginHorizontal: wp(3.5),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e8e8e8',
        borderRadius: wp(2),
    },
    searchInput: {
        width: '100%',
        paddingLeft: wp(9),
        height: hp(5.2),
        color: COLORS.darkgray,
        fontFamily: fontFamily.FONTS.regular,
    },
    searchIcon: {
        position: 'absolute',
        left: wp(3),
        top: hp(1.3),
    },
    microphoneIcon: {
        position: 'absolute',
        right: wp(3),
        top: hp(1.2),
    },
    soundMixButton: {
        backgroundColor: '#e8e8e8',
        padding: wp(2.4),
        borderRadius: wp(2),
        marginHorizontal: wp(3),
    },
    workersGrid: {
        paddingHorizontal: wp(3),
    },
    workerName: {
        color: COLORS.darkgray,
        fontSize: hp(1.6),
        fontFamily: fontFamily.FONTS.Medium,
    },
    workerItem: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: wp(3),
        marginVertical: hp(1),
    },
    imageContainer: {
        position: 'relative',
        width: wp(18),
        height: wp(18),
        overflow: 'hidden',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: wp(18),
    },
    flagIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: wp(5.5),
        height: wp(5.5),
        borderRadius: wp(5.5),
    },
});
