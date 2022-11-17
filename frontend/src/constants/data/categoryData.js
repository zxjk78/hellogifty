import { largeCategoryDict, smallCategoryDict } from './idDictionary';
import { View, Image, Text } from 'react-native';

const smallImgConfig = {
  width: 30,
  height: 30,
};

export const largeCategoryData = [
  {
    key: 0,
    value: (
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={require('../../assets/largeCategory/img0.png')}
          style={{ width: 20, height: 20 }}
        />
        <Text>{largeCategoryDict[0]}</Text>
      </View>
    ),
  },
  {
    key: 1,
    value: (
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={require('../../assets/largeCategory/img1.png')}
          style={{ width: 20, height: 20 }}
        />
        <Text>{largeCategoryDict[1]}</Text>
      </View>
    ),
  },
  {
    key: 2,
    value: (
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={require('../../assets/largeCategory/img2.png')}
          style={{ width: 20, height: 20 }}
        />
        <Text>{largeCategoryDict[2]}</Text>
      </View>
    ),
  },
  {
    key: 3,
    value: (
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={require('../../assets/largeCategory/img3.png')}
          style={{ width: 20, height: 20 }}
        />
        <Text>{largeCategoryDict[3]}</Text>
      </View>
    ),
  },
  {
    key: 4,
    value: (
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={require('../../assets/largeCategory/img4.png')}
          style={{ width: 20, height: 20 }}
        />
        <Text>{largeCategoryDict[4]}</Text>
      </View>
    ),
  },
  {
    key: 5,
    value: (
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={require('../../assets/largeCategory/img5.png')}
          style={{ width: 20, height: 20 }}
        />
        <Text>{largeCategoryDict[5]}</Text>
      </View>
    ),
  },
];

export const smallCategoryData = [
  [
    {
      key: 1,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/smallCategory/STARBUCKS.png')}
            style={smallImgConfig}
          />

          <Text>{smallCategoryDict[1]}</Text>
        </View>
      ),
    },
    {
      key: 2,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/smallCategory/TWOSOMEPLACE.png')}
            style={smallImgConfig}
          />

          <Text>{smallCategoryDict[2]}</Text>
        </View>
      ),
    },
  ],
  [
    {
      key: 3,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/smallCategory/CU.png')}
            style={smallImgConfig}
          />

          <Text>{smallCategoryDict[3]}</Text>
        </View>
      ),
    },
    {
      key: 4,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/smallCategory/GS25.png')}
            style={smallImgConfig}
          />

          <Text>{smallCategoryDict[4]}</Text>
        </View>
      ),
    },
  ],
  [
    {
      key: 5,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/smallCategory/PARISBAGUETTE.png')}
            style={smallImgConfig}
          />

          <Text>{smallCategoryDict[5]}</Text>
        </View>
      ),
    },
    {
      key: 6,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/smallCategory/TOUSLESJOURS.png')}
            style={smallImgConfig}
          />

          <Text>{smallCategoryDict[6]}</Text>
        </View>
      ),
    },
  ],
  [
    {
      key: 7,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/smallCategory/BASKINROBBINS.png')}
            style={smallImgConfig}
          />

          <Text>{smallCategoryDict[7]}</Text>
        </View>
      ),
    },
    {
      key: 8,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/smallCategory/SEOLBING.png')}
            style={smallImgConfig}
          />

          <Text>{smallCategoryDict[8]}</Text>
        </View>
      ),
    },
  ],
  [
    {
      key: 9,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/smallCategory/BHC.png')}
            style={smallImgConfig}
          />

          <Text>{smallCategoryDict[9]}</Text>
        </View>
      ),
    },
    {
      key: 10,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/smallCategory/DOMINO.png')}
            style={smallImgConfig}
          />

          <Text>{smallCategoryDict[10]}</Text>
        </View>
      ),
    },
  ],
  [
    {
      key: 11,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/smallCategory/HAPPYCON.jpg')}
            style={smallImgConfig}
          />

          <Text>{smallCategoryDict[11]}</Text>
        </View>
      ),
    },
    {
      key: 12,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/smallCategory/CGV.png')}
            style={smallImgConfig}
          />

          <Text>{smallCategoryDict[12]}</Text>
        </View>
      ),
    },
  ],
];
