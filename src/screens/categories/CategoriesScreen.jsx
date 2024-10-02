import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import FastImage from 'react-native-fast-image';

// Import data from JSON files
import categoriesData from '../../data/categories.json';
import workersData from '../../data/workers.json';

// Asset Mappings
const icons = {
    post: require('../../../assets/images/post.png'),
    rocket: require('../../../assets/images/rocket.png'),
    verify: require('../../../assets/images/verify.png'),
};

const profileImages = {
    user: require('../../../assets/images/user.jpg'),
    user1: require('../../../assets/images/user1.jpg'),
    user4: require('../../../assets/images/user4.jpg'),
};

const flags = {
    france: require('../../../assets/flags/france.png'),
    germany: require('../../../assets/flags/germany.png'),
    spain: require('../../../assets/flags/spain.png'),
    italy: require('../../../assets/flags/italy.png'),
    netharlands: require('../../../assets/flags/netharlands.png'),
    serbia: require('../../../assets/flags/serbia.png'),
    hungary: require('../../../assets/flags/hungary.png'),
    portugal: require('../../../assets/flags/portugal.png'),
    russia: require('../../../assets/flags/russia.png'),
    saudi: require('../../../assets/flags/saudi-arabia.png'),
    turkey: require('../../../assets/flags/turkey.png'),
    uk: require('../../../assets/flags/united-states.png'),
};

const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

const CategoriesScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories] = useState(categoriesData);
    const [workers] = useState(workersData);
    const [loading, setLoading] = useState(false);

    // Function to handle category selection
    const handleCategorySelect = useCallback((categoryId) => {
        setSelectedCategory(prevCategory => (prevCategory === categoryId ? null : categoryId));
    }, []);

    // Debounced search update
    const updateSearchText = useCallback(
        debounce((text) => {
            setSearchText(text);
        }, 300),
        []
    );

    // Memoize the filtered workers
    const filteredWorkers = useMemo(() => {
        return workers.filter(worker => {
            const matchesCategory = !selectedCategory || worker.categoryId === selectedCategory;
            const matchesSearch = worker.name.toLowerCase().includes(searchText.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [workers, selectedCategory, searchText]);

    // Memoized rendering function for category items
    const renderCategoryItem = useCallback(({ item }) => (
        <TouchableOpacity
            style={[styles.categoryItem, selectedCategory === item.id && styles.selectedCategory]}
            onPress={() => handleCategorySelect(item.id)}
        >
            <View style={{ backgroundColor: COLORS.white, padding: wp(1), borderRadius: wp(17) }}>
                <FastImage source={icons[item.icon]} style={styles.categoryIcon} />
            </View>
            <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
    ), [selectedCategory]);

    // Memoized rendering function for worker items
    const renderWorkerItem = useCallback(({ item }) => (
        <View style={styles.workerItem}>
            <View style={styles.imageContainer}>
                <FastImage source={profileImages[item.profileImage]} style={styles.profileImage} />
                <FastImage source={flags[item.flag]} style={styles.flagIcon} />
            </View>
            <Text style={styles.workerName}>{item.name}</Text>
        </View>
    ), []);

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
                        onChangeText={updateSearchText}
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
                    initialNumToRender={10}
                    maxToRenderPerBatch={5}
                    windowSize={5}
                    contentContainerStyle={styles.workersGrid}
                />
            </View>
        </SafeAreaView>
    );
};

export default React.memo(CategoriesScreen);

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
        paddingHorizontal: wp(1),
    },
    categoryIcon: {
        width: wp(16),
        height: wp(16),
        borderRadius: wp(16),
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
