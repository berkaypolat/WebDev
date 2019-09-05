import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, ButtonGroup, Container, Table } from 'reactstrap'
import AppNavbar from './AppNavBar'


class GroupList extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            groups: [
                {
                    id: 5,
                    name: 'San Fran JUG',
                    address: '13 Woodhill Drive',
                    city: 'Redwood City',
                    stateOrProvince: 'San Francisco',
                    events: [{ id: 4, title: 'Full Stack Reactive', date: new Date()}]
                }
            ],
            isLoading: false
        }
        this.remove = this.remove.bind(this)
    }

    remove(id){
        return <h1>Hi there, {id}</h1>
    }


    
    render(){

       const { groups, isLoading } = this.state

       if (isLoading) return <h1>Loading...</h1>

        const groupList = groups.map(group => {
            const address = `${group.address || ''} ${group.city || ''} ${group.stateOrProvince || ''}`
            return (
                <tr key={group.id}>
                    <td style={{whiteSpace: 'nowrap'}}>{group.name}</td>
                    <td>{address}</td>
                    <td>
                    {group.events.map(event => (
                            <div key={event.id}>
                            {new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: '2-digit'
                            }).format(new Date(event.date))}: {event.title}
                            </div>
                    ))}
                    </td>
                    <td>
                        <ButtonGroup>
                            <Button size="md" color="primary" tag={Link} to={"/groups/" + group.id}>Edit</Button>
                            <Button size="md" color="danger" onClick={() => this.remove(group.id)}>Delete</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            )
        })

        return (
            <div>
                <AppNavbar />
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={ Link } to="/groups/new">Add Group</Button>
                    </div>
                    <h3>My JUG Tour</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="20%">Name</th>
                                <th width="20%">Location</th>
                                <th>Events</th>
                                <th width="10%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {groupList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        )
    }
}

export default GroupList

