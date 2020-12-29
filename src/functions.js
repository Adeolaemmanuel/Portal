
import { db } from './database'
import { Cookies } from 'react-cookie'

const cookies = new Cookies();
let data = {}

const getProfile = ()=>{
    db.collection('Users').doc(cookies.get('id')).get().then(user=>{
        data.User = user.data()
        //console.log(user.data());
        data.subjectId = user.data().subjectId
        let len = data.subjectId.length
        db.collection('Details').doc(cookies.get('id')).collection('subjects').doc(data.subjectId[len-1]).get()
        .then(sub=>{
            data.subjects = sub.data().subjects
            //console.log(sub.data().subjects)
        })
        //console.log(subjectId[len -1])
        return data
    })
}

const Modal = ()=>{
    return(
        <div className='w3-modal'>
            <div className='w3-modal-content'>
                <div className='w3-container'>

                </div>
            </div>
        </div>
    )
}


export { getProfile, data,}