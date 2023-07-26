import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
 blank: {
    marginBottom: 40,
    justifyContent: 'center',
    marginVertical: 10,
  },
  filterContainer: {
    margintop: 10,
    justifyContent: 'center',
    marginVertical: 10,
  },
  filterButton: {
    marginHorizontal: 8,
    marginBottom: 5,
    paddingHorizontal: 16,
    backgroundColor: '#712D0F',
  },
  filterButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: 'white', 
  },
  productListContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    padding: 16,
    marginBottom: 16,
    width: 400,
  },
  productImage: {
    marginBottom: 4,
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  textstock: {
    marginBottom: 4,
  },
  price: {
    marginBottom: 4,
  },
  selectedProductsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    height: 300,

    alignItems: 'center',
  },
  selectedProductsText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  selectedProductText: {
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'center',
  },
  clearButton: {
   backgroundColor: '#712D0F',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    width: 400,
  },
  clearButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white', // Text color
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  signInText: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black', // Text color
  },
  welcomeText: {
    fontSize: 16,
    marginBottom: 16,
    color: 'black', // Text color
  },
  input: {
    marginBottom: 16,
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'lightgray',
    color: 'black', // Text color
  },
  button: {
    marginBottom: 16,
    backgroundColor: '#712D0F',
    borderRadius: 15,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
   forgotPasswordText: {
    color: '#712D0F',
    textAlign: 'center',
  },
  signUpText: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 100,
  },
  signUpLink: {
    color: 'red',
  },

});

export default styles;