import firebase from 'firebase';
import React,{Component}from 'react';
import { SnapshotViewIOS } from 'react-native';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,} from 'react-native';
    import {Card, Header, Icon} from 'react-native-elements'
    import db from '../config'

    export default class ReceiverDetailsScreen extends Component{
        constructor(props){
            super(props)
            this.state = {
                userId:firebase.auth().currentUser.email,
                receiverId:this.props.navigation.getParam('details')['user_id'],
                requestId:this.props.navigation.getParam('details')['request_id'],
                bookName:this.props.navigation.getParam('details')['book_name'],
                reason_for_requesting:this.props.navigation.getParam('details')['reason_to_request'],
                receiverName:"",
                receiverContact:"",
                receiverAddress:"",
                receiverRequestDocId:"",
            }
        }

        getRecieverDetails(){
            db.collection('users').where('email_id','==',this.state.receiverId).get()
            .then(snapshot=>{
                this.setState({
                    receiverName:doc.data().first_name,
                    receiverContact:doc.data().contact,
                    receiverAddress:doc.data().address
                })
            })
            db.collection('requested_books').where('request_id','==',this.state.requestId).get()
            .then(snapshot=>{
                snapshot.forEach(doc=>{
                    this.setState({
                        receiverRequestDocId:doc.id
                    })
                })
            })
        }
        updateBookStatus=()=>{
            db.collection('all_donations').add({
                book_name:this.state.bookName,
                request_id:this.state.requestId,
                requested_by:this.state.receiverName,
                donor_id:this.state.userId,
                request_status:"Donor Is Interested"
            })
        }
        componentDidMount(){
            this.getRecieverDetails()
        }
        render(){
            return(
                <View>
                    <View style={{flex:0.1}}>
                        <Header
                        leftComponent={<Icon name = 'arrow-left' type = 'feather'/>}
                        centerComponent={{text:"Donate Books",style:{fontSize:20}}}
                        backgroundColor="pink"
                        />
                    </View>
                    <View style={{flex:0.3}}>
                        <Card title = {"Book Information"}> 
                            <Card>
                                <Text>
                                    Name:{this.state.bookName}
                                </Text>
                            </Card>
                            <Card>
                                <Text>
                                    Reason:{this.state.reason_for_requesting}
                                </Text>
                            </Card>
                        </Card>
                    </View>
                </View>
            )
        }
    }