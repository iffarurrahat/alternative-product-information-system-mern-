import { Helmet } from "react-helmet-async";
import Container from "../../components/ui/Container";
import EmptyState from "../../components/EmptyState/EmptyState";
import ImgQueries from "../../assets/addEmptyImg.jpg";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MyQueriesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddQueries = async (e) => {
    e.preventDefault();
    const form = e.target;
    const product_name = form.product_name.value;
    const product_brand = form.product_brand.value;
    const image_URL = form.image_URL.value;
    const query_title = form.query_title.value;
    const boycotting_reason_details = form.boycotting_reason_details.value;
    const post_time = new Date();

    const addedQuery = {
      product_name,
      product_brand,
      image_URL,
      query_title,
      boycotting_reason_details,
      post_time,
      recommendation_count: 0,
      post: {
        email: user?.email,
        name: user?.displayName,
        photo: user?.photoURL,
      },
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/queries`,
        addedQuery
      );
      toast.success("Query added successfully!");
      navigate("/my-queries");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>My Queries Page || API System</title>
      </Helmet>

      <div className="">
        <EmptyState title="Added Your queries" image={ImgQueries} />
        <Container>
          <div className="my-10 sm:my-12 md:my-16 lg:my-20">
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md ">
              <h2 className="text-lg font-semibold text-gray-700 capitalize ">
                Added Your queries form 😀
              </h2>

              <form onSubmit={handleAddQueries}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  {/* product_name, product_brand */}
                  <div>
                    <label className="text-gray-700">Product Name</label>
                    <input
                      type="text"
                      name="product_name"
                      required
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700">Product Brand</label>
                    <input
                      type="text"
                      name="product_brand"
                      required
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                  </div>

                  {/* Image-URL, query_title */}
                  <div>
                    <label className="text-gray-700">Product Image-URL</label>
                    <input
                      type="text"
                      name="image_URL"
                      required
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700">Query Title</label>
                    <input
                      type="text"
                      name="query_title"
                      required
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                  </div>
                </div>
                {/* Boycotting Reason Details */}
                <div className="mt-6">
                  <label className="text-gray-700">
                    Boycotting Reason Details
                  </label>
                  <textarea
                    type="text"
                    name="boycotting_reason_details"
                    required
                    cols="30"
                    rows="5"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  ></textarea>
                </div>

                <div className=" mt-6">
                  <button
                    type="submit"
                    className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                  >
                    Add Query
                  </button>
                </div>
              </form>
            </section>
          </div>
        </Container>
      </div>
    </>
  );
};

export default MyQueriesPage;

/*



*/