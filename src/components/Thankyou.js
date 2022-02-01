import React, { useState } from 'react'
import { Card } from 'react-bootstrap'

function Thankyou() {

    const [value] = useState(sessionStorage.getItem('subscriber') || '');
    return (
        <div>

            <Card className='bg-light' style={{ width: '35rem', margin: 100, marginLeft: 400 }}>
                <Card.Body>
                    <Card.Title><h1>Thank You !!!</h1></Card.Title>
                    <Card.Text>
                        <h2>For Subscribing</h2>
                    </Card.Text><hr />
                    <h2>{value}</h2>
                </Card.Body>
            </Card>

        </div>
    )
}

export default Thankyou
