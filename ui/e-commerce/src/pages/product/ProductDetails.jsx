import React, {useEffect, useState} from "react";
import Navbar from "../../components/Navbar";
import {Button, Container, Icon, Label, Segment, Comment, Form, Header, Rating, Grid, Message} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";

function ProductDetails() {
    const [productData, setProductData] = useState("");
    const [star, setStar] = useState(0.0);
    const [errorMessage, setErrorMessage] = useState("");
    const searchParams = new URLSearchParams(window.location.search);
    const productId = searchParams.get('id');
    const navigate = useNavigate();
    const url = `http://localhost:8080/products/getProductById/${productId}`;
    const [data, setData] = useState([]);
    const [commentMessage, setCommentMessage] = useState("");
    const [addCommentText, setAddCommentText] = useState("");
    const [addCommentRating, setAddCommentRating] = useState(0);
    const [messageColor, setMessageColor] = useState("red");

    const addCart = (productId) =>
    {
        console.log(productId)

        if (localStorage.getItem("authorized") === "true") {
            const url = "http://localhost:8080/cart/addToCart?productId=" + productId ;
            const data = {
                productId: productId
            };
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': localStorage.getItem("tokenKey")
                },
                // body: JSON.stringify(data)
            })
                .then(response => {
                    //response.status
                    console.log(response.status)
                })
                .then(data => console.log(data))
                .catch(error => console.error(error));
        }else{
            navigate("/login")
        }



    }
    const getAverageRating = async (productId) => {
         fetch(`http://localhost:8080/reviews/getAverageRatingByProductId/${productId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                const averageRating = parseFloat(data);
                setStar(averageRating)
                console.log(star);

            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                throw error;
            });
    }
    useEffect(() => {

        const url = 'http://localhost:8080/reviews/getProductReviews/'+productId;
        const postData = async () => {
            try {
                const response = await fetch(url, {
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        'Authorization': localStorage.getItem("tokenKey")
                    },
                })
                const data = await response.json();
                setData(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        postData();
    }, []);



    useEffect(() => {
        const postData = async () => {

                const response = await  fetch(url)
                    .then(async response => {
                        if (response.status !== 302) {

                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        setErrorMessage("")
                        const data = await response.json();
                        setProductData(data)
                        console.log(data)
                    })
                    .catch(error => {
                        setErrorMessage("Product not found")
                        console.error(`Error: ${error.message}`)
                    })

        };

        postData();
        getAverageRating(productId)
        console.log('star'+star);
    }, []);

    const productNotFound = () => (
        <>
           <Label><h1>404: {errorMessage}</h1></Label>

        </>
    )
    const addComment = async () => {
        if (addCommentRating === 0) {
            setMessageColor("red")
            setCommentMessage("Please give a few stars")
        } else if (addCommentText === "") {
            setMessageColor("red")
            setCommentMessage("Please add comment text")
        } else {
            setMessageColor("green")
            setCommentMessage("")
            await fetch('http://localhost:8080/reviews/createReview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("tokenKey")
                },
                body: JSON.stringify({
                    "userId": localStorage.getItem("currentUser"),
                    "productId": productId,
                    "content": addCommentText,
                    "rating": addCommentRating
                })
            })
                .then(response => {
                    if (response.status === 409) {
                        setMessageColor("red")
                        setCommentMessage("You already have a comment for this book.")
                        throw new Error('HTTP error ' + response.status);
                    }else
                    if (!response.ok) {
                        throw new Error('HTTP error ' + response.status);
                    }

                    return response.json();
                })
                .then(data1 => {
                    data.push(data1)
                    console.log(data1);
                })
                .catch(error => {
                    console.error('There was an error:', error);
                }).then(()=>
                {
                    setAddCommentText("");
                    setAddCommentRating(0);
                    window.location.reload()
                });
        }
    }
    const handleEditClick = () => {
        // Edit ikonuna tıklandığında gerçekleşecek işlemleri burada tanımlayabilirsiniz
        console.log("Edit ikonuna tıklandı");
    };

    const handleDeleteClick = () => {
        // Edit ikonuna tıklandığında gerçekleşecek işlemleri burada tanımlayabilirsiniz
        console.log("Delete ikonuna tıklandı");
    };

   // console.log(productData)
    const productFound =() => (

<div>

            <Grid celled>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <img src={productData.imageUrl}/>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Grid>
                                <Grid.Column width={11} style={({ textAlign: "left" })}>
                                    <br/>
                                    <div style={({fontSize:'25px', fontWeight:'bold' })}>{productData.productName}</div><br/>
                                    {productData.publisher!=="" && productData.publisher !==null?<p>{productData.publisher}</p>:null}
                                    <div> {productData.authorName}</div><br/>
                                    <br/><div><h4 style={({fontSize:'18px'})}>Product Details</h4>
                                        <Grid style={{marginLeft:1}}>
                                            <Grid.Row>
                                                <Grid.Column width={6}>
                                                    {productData.isbn!=="" && productData.isbn !==null?<p>ISBN: {productData.isbn}</p>:null}
                                                </Grid.Column>
                                                <Grid.Column width={10}>
                                                    {productData.numberOfPages!=="" && productData.numberOfPages !==null?<p>Pages: {productData.numberOfPages}</p>:null}
                                                </Grid.Column>
                                            </Grid.Row>

                                            <Grid.Row>
                                                <Grid.Column width={6}>
                                                    {productData.language!=="" && productData.language !==null?<p>Language: {productData.language}</p>:null}
                                                </Grid.Column>
                                                <Grid.Column width={10} style={{paddingTop:10}}>
                                                    <Grid columns={2} divided>
                                                                <Icon name='star' color={"yellow"}/>{star}
                                                    </Grid>
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Grid.Column width={6}>
                                                    {productData.category!=="" && productData.category !==null?<p>Category: {productData.category}</p>:null}
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </div>


                                </Grid.Column>
                                <Grid.Column width={5} >
                                    <br/>
                                    <div style={{border: '1px solid ', borderColor: 'navy',paddingBottom:'10px'}}><br/>
                                        <div style={({fontSize:'25px', fontWeight:'bold' })}> {productData.price} ₺<br/>
                                        </div>
                                        <br/><Button  circular color='instagram'  onClick={() => addCart(productData.id)}>
                                            <Icon  circular fitted  color='white'  name='cart arrow down'  /> Add To Cart
                                        </Button>                <br/><br/>
                                        Stock: {productData.stock}
                                        <br/>
                                    </div>
                                </Grid.Column>
                        </Grid>
                        <br/><br/>
                        <Grid.Row>
                            <Grid.Column width={16} style={({ textAlign: "left" })}>
                                <p style={({fontSize:'17px', fontWeight:'bold' })}>Description</p>
                                {productData.description}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
<br/>
        <Comment.Group >
            <Header as='h3' dividing>
                Comments
            </Header>

                            {data.map.length > 0 ?data.map(item => (
                                <Comment  style={({ textAlign: "left" })}>

                                    <Comment.Content >
                                        <Comment.Author as='a'>{item.username}</Comment.Author>
                                        <Comment.Metadata>
                                            <div>{item.createdDate}</div>
                                        </Comment.Metadata><br/>
                                        <Comment.Metadata>
                                            <Rating icon='star' defaultRating={item.rating} maxRating={5} disabled />
                                        </Comment.Metadata>
                                        {localStorage.getItem("username") === item.username ? <>
                                            <Icon onClick={handleEditClick} link={true} style={{float:"right"}} name="edit outline" color="green" size={"big"}></Icon>
                                            <Icon onClick={handleDeleteClick} link={true} style={{float:"right"}} name="trash alternate outline" color="yellow" size={"big"}></Icon></>:null}

                                        <Comment.Text>{item.content}</Comment.Text>

                                    </Comment.Content>

                                </Comment>
                            )) :"Yorum Yapılmamış"}<br/><br/>


            {localStorage.getItem("authorized") ==="true"?
                <Form reply>
                <Form.TextArea value={addCommentText} onChange={(event) => setAddCommentText(event.target.value)}/>
                 <Rating icon='star' rating={addCommentRating} onRate={(event, data1) => setAddCommentRating(data1.rating)}  maxRating={5} size={"huge"}/><br/><br/>
                    {commentMessage!==""? <>{<Message color={messageColor}>{commentMessage}</Message>}</>:null}<br/><br/>
                <Button circular content='Add Comment' onClick={addComment} labelPosition='left' icon='edit' color='instagram'/>
            </Form>:"Yorum yapmak için giriş yapınız"}
        </Comment.Group>
        </div>
    )
    return (

        <Container>
            <Navbar />

            <Segment><center>
                {errorMessage!=="" ? productNotFound():productFound() }
            </center> </Segment>
                </Container>
    );
}

export default ProductDetails;
