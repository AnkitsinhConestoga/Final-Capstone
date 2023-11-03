import { Dimensions, StyleSheet } from 'react-native';
import Colors from './Colors';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height

const StyleView = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,

  },

  logo: {
    width: 300,
    height: 330,
    marginBottom: 10,
    alignSelf: 'center',
  },
  t1: {
    color: Colors.textColor41,
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    fontWeight: '500',
  },
  t2: {
    color: Colors.colorA0,
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '400',
    alignSelf: 'center',
    lineHeight: 24,
  },
  t3_sub: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    color: Colors.colorfb,
  },
  t4: {
    color: Colors.grey5a,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    alignSelf: 'center',
    lineHeight: 24,
  },

  placeHolderStyle: {
    // plac:Colors.greyd0
    color:Colors.textColor41
    
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Makes the image circular
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    width:40,
    height:40,
    right: 5,
    backgroundColor: Colors.colorfb,
    borderRadius: 15, // Makes the icon button circular
    padding: 5,
  },
  rowContainer:{

    flexDirection: 'row',
    alignItems: 'center',
  },
  inputcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: "solid",
    width: windowW*0.95,
    alignSelf: "center",
    borderColor: Colors.greyb8,
    borderRadius: 8,
  },
  centerElement:{
    width: windowW*0.95,
    alignSelf: "center",
  },
  iconStyle: {
    width: 24,
    height: 24,
    overflow: "hidden",
    marginEnd:10
  },
  greyBorder: {
    borderRadius: 8,
    borderStyle: "solid",
    borderColor: Colors.greyb8,
    borderWidth: 1,
    width: windowW*0.95,
    alignSelf: "center",
  },
  iconContainer: {
    padding: 5,
  },
  lineStyle: {
    backgroundColor: Colors.greyb8,
    borderStyle: "solid",
    borderColor: Colors.greyb8,
    borderTopWidth: 1,
    flex: 1,
    margin: 10,
    width: windowW,
    height: 1
  },
  verticalLine:{
    height: '60%',
    width: 1,
    marginRight:'2%',

    backgroundColor: '#909090',
  },
  input: {
    flex: 1,
    color: Colors.black
  },

  b1: {

    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    backgroundColor: Colors.colorf5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '500',
  },
  b2: {

    color: Colors.colorf5,
    fontSize: 16,

    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  b8: {
    color: Colors.greyb8,
    fontWeight: "500",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },

  B1: {
    borderRadius: 8,
    backgroundColor: Colors.colorf5,
    width: "90%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'center'


  },
  lineView: {
    backgroundColor: "#b8b8b8",
    borderStyle: "solid",
    borderColor: "#b8b8b8",
    borderTopWidth: 1,
    flex: 1,
    width: "100%",
    height: 1
  },
  B2: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderStyle: 'solid',
    width: '90%',
    borderColor: Colors.colorf5,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },


});

export default StyleView;