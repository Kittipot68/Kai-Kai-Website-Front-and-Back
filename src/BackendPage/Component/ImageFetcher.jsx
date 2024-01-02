import React, { Component } from 'react';

class ImageFetcher extends Component {
    state = {
        imageUrl: null,
    };

    componentDidMount() {
        const { imageName } = this.props;

        if (imageName) {
            fetch(`https://sungroup.co.th/Php-Api/getpicture.php?name=${imageName}`)
                .then((response) => {
                    if (response.status === 200) {
                        return response.blob();
                    }
                    throw new Error('Image not found');
                })
                .then((imageBlob) => {
                    this.setState({ imageUrl: URL.createObjectURL(imageBlob) });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    render() {
        return (
            <div>
                {this.state.imageUrl && (
                    <img src={this.state.imageUrl} alt={this.props.imageName} />
                )}
            </div>
        );
    }
}

export default ImageFetcher;
