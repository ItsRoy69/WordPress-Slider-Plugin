### WordPress Slider Plugin

This plugin allows you to easily create and customize sliders for your WordPress website.

#### Installation Instructions:

1. Ensure Docker Desktop is installed. If not, download and install Docker Desktop following the instructions for your operating system from [Docker's official website](https://www.docker.com/products/docker-desktop).

2. Install `@wordpress/env` globally by running the following command in your terminal:

    ```
    npm -g install @wordpress/env
    ```

3. Navigate to your desired directory in the terminal where you want to set up the WordPress environment.

4. Start the local WordPress environment by running:

    ```
    wp-env start
    ```

5. After the script finishes running, access the WordPress dashboard by navigating to [http://localhost:8888/wp-admin](http://localhost:8888/wp-admin) and logging in with the username `admin` and password `password`.

6. Clone the WordPress Slider Plugin repository:

    ```
    git clone https://github.com/ItsRoy69/WordPress-Slider-Plugin.git
    ```

7. Navigate into the cloned directory and install the necessary dependencies:

    ```
    cd WordPress-Slider-Plugin
    npm install
    ```

8. Build the plugin:

    ```
    npm run build
    ```

9. Create a zip folder for the plugin:

    ```
    npm run plugin-zip
    ```

10. Finally, move to [http://localhost:8888/wp-admin/plugins.php](http://localhost:8888/wp-admin/plugins.php) and upload the generated zip folder by clicking on "Add New Plugin".

#### Usage Guidelines:

- Once the plugin is installed and activated, navigate to the WordPress dashboard.
- Look for the plugin settings in the admin menu to configure and customize your sliders.
- Create new sliders, add images, customize settings, and embed them into your WordPress pages or posts using shortcodes or Gutenberg blocks.

Enjoy using the WordPress Slider Plugin for your website! If you encounter any issues or have any questions, please refer to the plugin's documentation or reach out to the plugin author for support.