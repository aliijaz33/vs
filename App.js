/* eslint-disable prettier/prettier */
// import { View, Text } from 'react-native';
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import AppStack from './src/AppStack/AppStack';

// const App = () => {



//   return (
//     <NavigationContainer>
//       <AppStack />
//     </NavigationContainer>
//   );
// };

// export default App;


















import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

const App = () => {
  const [marks, setMarks] = useState();
  const [creditHours, setCreditHours] = useState();
  const [subjects, setSubjects] = useState([]);

  const getSubjectGpa = () => {

    let setGpa;

    switch (true) {
      case marks >= 90 && marks <= 100:
        setGpa = 4;
        break;
      case marks >= 85 && marks <= 89:
        setGpa = 3.7;
        break;
      case marks >= 80 && marks <= 84:
        setGpa = 3.3;
        break;
      case marks >= 75 && marks <= 79:
        setGpa = 3.0;
        break;
      case marks >= 70 && marks <= 74:
        setGpa = 2.7;
        break;
      case marks >= 65 && marks <= 69:
        setGpa = 2.3;
        break;
      case marks >= 60 && marks <= 64:
        setGpa = 2.0;
        break;
      case marks >= 55 && marks <= 59:
        setGpa = 1.7;
        break;
      case marks >= 50 && marks <= 54:
        setGpa = 1.3;
        break;
      case marks >= 0 && marks < 50:
        setGpa = 0;
        break;
    }
    return setGpa;
  };

  const calculate = () => {
    let sumGrades = 0;
    let totalCreditHours = 0;
    subjects.forEach((subject) => {
      const crdtHrs = parseInt(subject.creditHours, 10);
      sumGrades += subject.creditHours * subject.subjectGpa;
      totalCreditHours += crdtHrs;
    });
    const value = parseFloat(sumGrades / totalCreditHours);
    const cgpa = value.toFixed(2);
    Alert.alert(
      'Your CGPA is',
      String(cgpa),
      [
        {
          text: 'OK',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  }
  const Save = () => {
    if (marks >= 1 && marks <= 100) {
      if (creditHours >= 1 && creditHours <= 4) {
        const subjectGpa = getSubjectGpa();
        const values = { marks, creditHours, subjectGpa };
        const newSubjects = [...subjects, values];
        setSubjects(newSubjects);
      } else {
        Alert.alert(
          'Oops!',
          'Please Enter Credit Hours between 1 to 4',
          [
            {
              text: 'OK',
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
      }
    } else {
      Alert.alert(
        'Oops!',
        'Please Enter Marks between 1 to 100',
        [
          {
            text: 'OK',
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
    }
  };

  const removeSubject = (index) => {
    const student = [...subjects];
    student.splice(index, 1);
    setSubjects(student);
  };

  const Reset = () => {
    setSubjects([]);
    setCreditHours();
    setMarks();
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}><Text style={styles.headerText}>CGPA Calculator</Text></View>
      <View style={styles.container1}>
        <Text style={styles.label}>Marks:</Text>
        <TextInput
          onChangeText={(txt) => {
            setMarks(txt);
          }}
          style={styles.input}
          placeholder="Enter Your Subject Marks"
          value={marks}
        />
        <Text style={styles.label}>Credit Hours:</Text>
        <TextInput
          onChangeText={(txt) => {
            setCreditHours(txt);
          }} style={styles.input}
          placeholder="Enter Subject's credit hours"
          value={creditHours}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <TouchableOpacity
            onPress={Save}
            style={styles.btn}
          >
            <Text style={styles.btnTxt}>Add Subject</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={Reset}
            style={styles.btn}
          >
            <Text style={styles.btnTxt}>Reset</Text>
          </TouchableOpacity>
        </View>


        <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, width: '93%', }} />
        <Text style={styles.label}>All Subjects:</Text>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {subjects.map((item, index) => {
            return (
              <View style={styles.subjectList} key={index}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.listText}>Subject {index + 1}.</Text>
                  <Text style={styles.listText}>Marks: {item.marks}</Text>
                  <Text style={styles.listText}>Credit Hours: {item.creditHours}</Text>
                </View>
                <View>
                  <TouchableOpacity onPress={removeSubject} style={styles.cross}><Entypo name='cross' size={35} color='black' /></TouchableOpacity>
                </View>
              </View>)
          })}
        </ScrollView>
        <TouchableOpacity
          onPress={calculate}
          style={styles.btn}
        >
          <Text style={styles.btnTxt}>Calculate CGPA</Text>
        </TouchableOpacity>
        <View style={{ borderBottomColor: 'gray', marginBottom: '3%', borderBottomWidth: 1, width: '93%', }} />

      </View>
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
    paddingLeft: '5%',
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: 'rgba(0,100,255, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: 'black',
    fontSize: 27,
    fontWeight: 'bold',
  },
  label: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 2,
    paddingTop: '3%',
  },
  input: {
    width: '93%',
    marginTop: 5,
    backgroundColor: 'white',
    fontSize: 18,
  },
  btn: {
    width: '35%',
    height: 40,
    marginTop: 19,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginEnd: '10%',
    marginBottom: '3%',
  },
  btnTxt: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subjectList: {
    flexDirection: 'row',
    width: '93%',
    height: 50,
    backgroundColor: 'green',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: '3%',
    justifyContent: 'space-between',
  },
  listText: {
    fontSize: 15,
    color: 'black',
    marginLeft: 15,
    fontWeight: 'bold',
  },
  cross: {
    backgroundColor: 'red',
    height: 50,
    width: 58,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'flex-end',
  },
});
