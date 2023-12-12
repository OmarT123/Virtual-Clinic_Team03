import {useState, useEffect} from 'react'
import axios from 'axios'
import PatientAuthorization from '../../components/PatientAuthorization'

const SuccessfulCheckoutAppointment = ({user}) => {
    // const patientId = "6575badad728c698d3d1d93d"
    
    useEffect(() => {
        const verifyCheckout = async () => {
            const body = {}
            body['appointmentId'] = localStorage.getItem('appointment')
            const name = localStorage.getItem('attendantName')
            body['name'] = name
            console.log(name)
            await axios.put('/reserveAppointment?id='+user._id,body).then(res=>console.log(res.data))
            body['message'] = "Booked Appointment"
            await axios.get('/sendCheckoutMail?id='+user._id, {params: body}).then(res=>console.log(res.data))
            window.location.href = '/'
        }
        verifyCheckout()
    }, [])

    return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
    )
}

export default PatientAuthorization(SuccessfulCheckoutAppointment)