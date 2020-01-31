import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import {
  Container,
  Grid,
  Paper,
  Avatar,
  Button,
  TextField
} from "@material-ui/core";

import axios from "axios";

import {EventCard} from "../components/eventCard";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      edit: false,
      favorite: [],
      user: {
        name: "",
        email: "",
        password: "",
        phone: "",
        image: ""
      }
    };
  }

  onClickEdit = () => {
    this.setState({ edit: true });
  };

  handleFormChange = event => {
    let usernew = { ...this.state.user };
    usernew[event.target.name] = event.target.value;
    this.setState({
      user: usernew
    });
  };

  onClickCancel = () => {
    this.setState({ edit: false });
  };

  onClickSave = () => {
    const id = localStorage.getItem("id");
    const { name, email, phone, password, image } = this.state.user;
    axios
      .put(
        `https://dumbtick-api.herokuapp.com/api/v1/user/${id}`,
        {
          name: name,
          email: email,
          phone: phone,
          image: image
        },
        {
          headers: { authorization: "Bearer " + localStorage.getItem("token") }
        }
      )
      .then(res => {
        alert(res.data.message);
        this.setState({ edit: false });
      })
      .catch(err => {
        alert(err);
      });
  };

  componentDidMount() {
    const id = localStorage.getItem("id");
    axios
      .get(`https://dumbtick-api.herokuapp.com/api/v1/user/${id}/favorites`, {
        headers: { authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(res => {
        this.setState({
          favorite: res.data
        });
      })
      .catch(err => {
        alert(err);
      });

    axios
      .get(`https://dumbtick-api.herokuapp.com/api/v1/user/${id}`, {
        headers: { authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(res => {
        console.log(res)
        this.setState({
          user: res.data
        });
      })
      .catch(err => {
        alert(err);
      });
  }
  render() {
    const favorite = this.state.favorite;
    return (
      <div>
        <Container maxWidth="lg" style={{ marginBottom: 40 }}>
          <div style={{ marginBottom: 30, marginTop: 40 }}>
            <Typography
              variant="h4"
              style={{ color: "#EF233C", fontWeight: "bold" }}
            >
              My Profile
            </Typography>
          </div>
          {this.state.edit ? (
            <Grid container alignItems="center" style={{ padding: 50 }}>
              <Grid item xs={10} md={10}>
                <div style={{ display: "flex" }}>
                  <TextField
                    label="fullname"
                    name="fullname"
                    style={{ marginRight: 80 }}
                    value={this.state.user.name}
                    onChange={this.handleFormChange}
                  />
                  <Button
                    onClick={this.onClickSave}
                    variant="outlined"
                    size="small"
                    color="secondary"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={this.onClickCancel}
                    variant="outlined"
                    size="small"
                    color="secondary"
                  >
                    Cancel
                  </Button>
                </div>
                <div>
                  <TextField
                    label="email"
                    name="email"
                    value={this.state.user.email}
                    onChange={this.handleFormChange}
                  />
                  <div>
                    <TextField
                      label="password"
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.handleFormChange}
                    />
                  </div>
                </div>
                <div>
                  <TextField
                    label="image"
                    name="image"
                    value={this.state.user.image}
                    onChange={this.handleFormChange}
                  />
                </div>
              </Grid>
              <Grid item xs={2} md={2}>
                <Avatar
                  src={localStorage.getItem("image")}
                  style={{ height: 150, width: 150 }}
                ></Avatar>
              </Grid>
            </Grid>
          ) : (
            <Grid container alignItems="center" style={{ padding: 50 }}>
              <Grid item xs={10} md={10}>
                <div style={{ display: "flex" }}>
                  <Typography
                    variant="h4"
                    style={{ marginRight: 80, textTransform: "capitalize" }}
                  >
                    {this.state.user.name}
                  </Typography>
                  <Button
                    onClick={this.onClickEdit}
                    variant="outlined"
                    size="small"
                    color="secondary"
                  >
                    Edit Profile
                  </Button>
                </div>
                <div>
                  <Typography>{this.state.user.email}</Typography>
                </div>
              </Grid>
              <Grid item xs={2} md={2}>
                <Avatar
                  src={this.state.user.image}
                  style={{ height: 150, width: 150 }}
                ></Avatar>
              </Grid>
            </Grid>
          )}

          <div style={{ marginBottom: 30, marginTop: 40 }}>
            <Typography
              variant="h4"
              style={{ color: "#EF233C", fontWeight: "bold" }}
            >
              Favorite
            </Typography>
          </div>
          <Grid container spacing={3}>
            {favorite.map((item, index) => (
              <EventCard
                key={index}
                id={item.favoritedEvent.id}
                title={item.favoritedEvent.title}
                start={item.favoritedEvent.startTime}
                img={item.favoritedEvent.img}
                price={item.favoritedEvent.price}
                desc={item.favoritedEvent.description}
              />
            ))}
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Profile;