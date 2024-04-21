const FeaturesDark = () => {
  return (
    <div className="features dark">
      <div className="container">
        <div className="content">
          <h2>
            fiverr <span>business</span>
          </h2>
          <h3>
            A business solution designed for <span>teams</span>
          </h3>
          <p>
            Upgrade to a curated experience packed with tools and benefits,
            dedicated to businesses
          </p>
          <div className="text">
            <div className="title">
              <img src="/assets/check.png" alt="" />
              <h4>Connect to freelancers with proven business experience</h4>
            </div>
            <div className="title">
              <img src="/assets/check.png" alt="" />
              <h4>
                Get matched with the perfect talent by a customer success
                manager
              </h4>
            </div>
            <div className="title">
              <img src="/assets/check.png" alt="" />
              <h4>
                Manage teamwork and boost productivity with one powerful
                workspace
              </h4>
            </div>
          </div>
          <button>Explore fiverr business</button>
        </div>
        <div className="video">
          <img
            src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesDark;
