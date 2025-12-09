import { TbEdit } from "react-icons/tb";

const UserProfile = () => {
  return (
    <section className="grid grid-cols-12">
      <div className="col-span-1"></div>
      <div className="col-span-10 flex flex-col navbar-offset bg-red-400 px-4 py-6 md:px-8 md:py-10">
        <div>
          <h1>My Profile</h1>
          <p>Manage your account and profile information</p>
        </div>

        {/* tourists */}
        <div>
          <p>profile pic</p>
          <h2>full name</h2>
          <p>username</p>
          <p>Member since 1/15/2023</p>

          <p>bio</p>
          <h3>Profile completion</h3>
          {/* progress bar with percentage */}

          {/* make private, if need make to can setup public */}
          <p>email</p>
          <p>phone</p>
          <p>location</p>
          <p>age</p>
        </div>

        {/* guides */}
        <div>
          <p>verified badge</p>
          <p>profile pic</p>
          <h2>full name</h2>
          <p>username</p>
          <p>Member since 1/15/2023</p>

          <p>bio</p>
          <h3>Profile completion</h3>
          {/* progress bar with percentage */}

          <p>email</p>
          <p>phone</p>
          <p>location</p>
          <p>price per hour</p>
          <p>age</p>
        </div>

        {/* ============================================= */}

        {/* tourists */}

        <div>
          <p>preferences section</p>
          <button>add more</button>
        </div>
        <div>
          <p>my tours</p>
          {/* can add a photo with simple description */}
          <button>add my tours</button>
        </div>

        {/* guides */}
        <div>
          <p>packages</p>
          {/* can add 3 package options, photo with description */}
          <button>add packages</button>
        </div>
        <div>
          <p>experience section</p>
          {/* this section guides can upload their experiences with tourists, image with simple description */}
          <button>add new experience</button>
        </div>
      </div>
      <div className="col-span-1"></div>
    </section>
  );
};

export default UserProfile;
