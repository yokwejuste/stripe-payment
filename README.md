![Recording2024-05-13000302online-video-cutter com-ezgif com-video-to-gif-converter](https://github.com/yokwejuste/stripe-payment/assets/71908316/3d40a4dc-667e-4b79-b30e-be0029515f99)
## Making Stripe Payments with Python and React in 2024

This project contains the code for a simple purchase flow using Stripe Checkout. The backend is built with Python and Flask, and the frontend is built with React.

### Simple Project Structure

For the sake of simplicity we provided a simple structure for the project. The project is divided into two main directories: `server` and `frontend`. The `server` directory contains the Flask app that serves the API, and the `frontend` directory contains the React app that serves the frontend.

![Project structure](https://github.com/yokwejuste/visuleo_port/assets/71908316/fe6a2d12-14cd-4ff9-9a50-f097b5b9e8bd)

### Running the Project
We provided a `docker-compose.yml` file that allows you to run the project with a single command. To run the project, make sure you have Docker installed on your machine, and then run the following command:

```bash
# copy the .env files
cp frontend/.env.example frontend/.env

cp server/.env.example server/.env

# run the project using docker-compose
docker compose up
```
> Note: The secret keys in the `.env` files are for testing purposes only They are publicly available on the [stripe documentation](https://stripe.com/docs/keys).

### Contributing
If you have any suggestions or improvements, feel free to open an issue or create a pull request. We welcome contributions from the community.
