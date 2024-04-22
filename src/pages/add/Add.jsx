import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./add.scss";
import makeRequest from "../../axios";
import { useNavigate } from "react-router-dom";
import { useReducer, useState } from "react";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload";

const Add = () => {
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const [coverFile, setCoverFile] = useState(null);
  const [files, setFiles] = useState(null);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return makeRequest.post(`/gigs`, gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeatures = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURES",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async (e) => {
    setUploading(true);
    try {
      const cover = await upload(coverFile);
      let images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, imgs: images } });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddGig = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/my-gigs");
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="cat">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <div className="images">
              <div className="images-inputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  className="file"
                  name="cover"
                  onChange={(e) => setCoverFile(e.target.files[0])}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  className="file"
                  name="imgs"
                  onChange={(e) => setFiles(e.target.files)}
                />
                <button onClick={handleUpload}>
                  {uploading ? "loading..." : "Upload"}
                </button>
              </div>
            </div>
            <label htmlFor="desc">Description</label>
            <textarea
              name="desc"
              id="desc"
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              placeholder="e.g. One-page web design"
              name="shortTitle"
              onChange={handleChange}
            />
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input
              type="number"
              min={1}
              name="deliveryTime"
              onChange={handleChange}
            />
          </div>
          <div className="details">
            <label htmlFor="shortDesc">Short Description</label>
            <textarea
              id="shortDesc"
              placeholder="Short description of your service"
              cols="30"
              rows="10"
              name="shortDesc"
              onChange={handleChange}
            ></textarea>
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              min={1}
              name="revisionNumber"
              onChange={handleChange}
            />
            <label htmlFor="">Add Features</label>
            <form onSubmit={handleFeatures} className="add">
              <input
                type="text"
                placeholder="e.g. page design"
                name="features"
              />
              <button type="submit">Add</button>
            </form>
            <div className="added-features">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="price">Price</label>
            <input type="number" min={1} name="price" onChange={handleChange} />
            <button onClick={handleAddGig}>Create</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
