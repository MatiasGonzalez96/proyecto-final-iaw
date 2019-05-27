import React from 'react';
import Carousel from 'react-bootstrap/Carousel'

class ControlledCarousel extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleSelect = this.handleSelect.bind(this);
  
      this.state = {
        index: 0,
        direction: null,
      };
    }
  
    handleSelect(selectedIndex, e) {
      this.setState({
        index: selectedIndex,
        direction: e.direction,
      });
    }
  
    render() {
      const { index, direction } = this.state;
  
      return (
		<div className="container panelCarousel">
			<div className="row">

				<Carousel className="col-12 mx-auto mb-5" activeIndex={index} direction={direction} onSelect={this.handleSelect}>

					<Carousel.Item>
						<img className="d-block w-100 imgCarousel" src="././img/foto4.jpg" alt="Foto 1"/>
					</Carousel.Item>

					<Carousel.Item>
						<img className="d-block w-100 imgCarousel" src="././img/foto5.jpg" alt="Foto 2"/>
					</Carousel.Item>

					<Carousel.Item>
						<img className="d-block w-100 imgCarousel" src="././img/foto3.jpg" alt="Foto 3"/>
					</Carousel.Item>

				</Carousel>

			</div>
		</div>
      );
    }
  }
  
export default ControlledCarousel;