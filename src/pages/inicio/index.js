import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, Pressable, View, Dimensions } from "react-native";
import { useState } from "react";
import SwiperFlatList from "react-native-swiper-flatlist";

const { width, height } = Dimensions.get('window');

export default function Splash() {
  const navigation = useNavigation();
  const [bloq, setBloq] = useState(3);

  const data = [
    {
      id: 1,
      img: require('../../../assets/img/inicio/musicB.png'),
      local: 'Music'
    },
    {
      id: 2,
      img: require('../../../assets/img/inicio/drawB.png'),
      local: 'Draws'
    },
    {
      id: 3,
      img: require('../../../assets/img/inicio/rolesB.png'),
      local: 'Roles'
    },
    {
      id: 4,
      img: bloq > 3 ? require('../../../assets/img/inicio/usB.png') : require('../../../assets/img/inicio/bloquedB.png'),
      local: bloq > 3 ? 'Final' : ''
    }
  ];

  const go = (local) => {
    if (!local) return;
    setTimeout(() => {
      navigation.navigate(local);
    }, 300);
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../assets/img/inicio/back.png')}
        style={{ flex: 1 }}
      >
        <SwiperFlatList
          data={data}
          paginationActiveColor="#267662"
          paginationDefaultColor="#fff"
          paginationStyle={{bottom: '5%', transform:[{scale: 2}]}}
          renderItem={({ item }) => (
            <View
              style={{
                width: width,
                height: height,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Pressable onPress={() => go(item.local)}>
                <Image
                  source={item.img}
                  style={{
                    width: width ,
                    height: height,
                    resizeMode: 'contain',
                  }}
                />
              </Pressable>
            </View>
          )}
        keyExtractor={item => item.id.toString()}
        showPagination
        autoplayLoop 
        loop={true}
        index={0}
        />
      </ImageBackground>
    </View>
  );
}
