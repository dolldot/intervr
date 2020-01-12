import { StyleSheet } from 'react-native';
import { color } from '../../config';

export default StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: color.white
  },
  content: {
    height: '100%',
    alignItems: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    flex: 4,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    color: color.white,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  topContent: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  botContent: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 13
  },
  capture: {
    flex: 0,
    backgroundColor: color.primaryLight,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30
  }
});
