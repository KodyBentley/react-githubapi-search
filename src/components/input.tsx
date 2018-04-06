// Node Modules
import * as React from 'react';
import * as Request from 'request';
import { Row, Col, Grid, Table } from 'react-bootstrap';

// Interfaces
import State from './../interfaces/StateInterface';

// CSS
import '../static/css/input.css';

interface Props {

}

export default class Input extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            isHidden: true,
            value: '',
            user: '',
            avatarUrl: '',
            loginName: '',
            created: '',
            following: '',
            followers: '',
            publicRepos: '',
            repos: []
        };
    }

    handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        this.setState({ user: this.state.value });
        Request('https://api.github.com/users/' + this.state.value, (err, res, body) => {
            if (err) {
                console.log('REQUEST ERR', err);
            } else {
                console.log('User search sucessful');
                let parsedData = JSON.parse(body);
                if (this.state.isHidden === true) {
                    this.setState({
                        isHidden: !this.state.isHidden,
                        avatarUrl: parsedData.avatar_url,
                        loginName: parsedData.login,
                        created: parsedData.created_at,
                        following: parsedData.following.toString(),
                        followers: parsedData.followers.toString(),
                        publicRepos: parsedData.public_repos.toString()
                    });
                } else {
                    return;
                }
            }
        });

        Request('https://api.github.com/users/' + this.state.value + '/repos', (err, res, body) => {
            if (err) {
                console.log('REQUEST ERR', err);
            } else {
                console.log('User search sucessful');
                let parsedData = JSON.parse(body);
                this.setState({ repos: parsedData });
            }
        });
        this.setState({ isHidden: true });
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ value: e.target.value });
    }

    render() {
        return (
            <div className="container">
                <Grid>
                    <Row>
                        <Col lg={12}>
                            <div>
                                <span><i>Searching for...{this.state.user}</i></span>
                            </div>
                            <div className="input-field">
                                <form onSubmit={this.handleSubmit}>
                                    <input onChange={this.handleChange} type="text" value={this.state.value} />
                                    <input type="submit" value="Submit" />
                                </form>
                            </div>
                        </Col>
                    </Row>
                    {!this.state.isHidden &&
                        <Row>
                            <Col lg={12}>
                                <Row>
                                    <Col lg={12}>
                                        <img className="avatar-img" src={this.state.avatarUrl} />
                                    </Col>
                                </Row>
                                <h1>{this.state.loginName}</h1>
                            </Col>
                            <Col lg={12}>
                                <Row>
                                    <Col lg={3} className="small-info-containers">
                                        <div className="small-info-boxes">
                                            <h4>Account Created</h4>
                                            <p>{this.state.created}</p>
                                        </div>
                                    </Col>
                                    <Col lg={3} className="small-info-containers">
                                        <div className="small-info-boxes">
                                            <h4>Followers</h4>
                                            <p>{this.state.followers}</p>
                                        </div>
                                    </Col>
                                    <Col lg={3} className="small-info-containers">
                                        <div className="small-info-boxes">
                                            <h4>Following</h4>
                                            <p>{this.state.following}</p>
                                        </div>
                                    </Col>
                                    <Col lg={3} className="small-info-containers">
                                        <div className="small-info-boxes">
                                            <h4>Repos</h4>
                                            <p>{this.state.publicRepos}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={12}>
                                <h1>Repos</h1>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Last Updated</th>
                                            <th>Link</th>
                                        </tr>
                                    </thead>
                                    {this.state.repos.map(data => {
                                        return (
                                            <tbody key={data.id}>
                                                <tr>
                                                    <th>{data.name}</th>
                                                    <th>{data.updated_at}</th>
                                                    <th>
                                                        <a href={'https://github.com/' + this.state.value + '/' + data.name} target="_blank">
                                                            {data.url}
                                                        </a>
                                                    </th>
                                                </tr>
                                            </tbody>
                                        );
                                    })}
                                </Table>
                            </Col>
                        </Row>
                    }
                </Grid>
            </div>
        );
    }
}
