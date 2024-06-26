import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import storeService from '../appwrite/storage';
import { Button, Container } from '.././component/index';
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Loading from "../component/Loading";

export default function PostPage() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userID === userData.$id : false;

    useEffect(() => {
        if (slug) {
            storeService.getPost(slug)
            .then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        storeService.deletePost(post.$id)
        .then((status) => {
            if (status) {
                storeService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={storeService.getfilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-3xl w-[1100px] h-[550px]"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : <Loading />;
}