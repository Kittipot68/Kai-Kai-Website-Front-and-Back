// ProductModal.js

import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import bannershopee from '../../assets/shopee-banner.png';
import bannerline from '../../assets/lineshop-banner.png';
const ProductModal = ({ product, onClose }) => {
    return (
        <Modal show={!!product} onHide={onClose} centered size="lg" className="fade">
            <Modal.Header closeButton className="bg-red-600 text-white">
                <Modal.Title className='text-4xl font-bold'>{product?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="grid  sm:grid-cols-1 md:grid-cols-2  gap-3">
                    <div className="mb-4 sm:mb-0">
                        {/* Content for the first column */}
                        <img
                            src={`https://sungroup.co.th/Php-Api/getpicture.php?name=${product?.photo}`}
                            alt={product?.name}
                            className=" "
                        />
                    </div>
                    <div className="mb-4 sm:mb-0 overflow-auto max-h-[250px]">
                        {/* Content for the second column */}
                        <p className="text-gray-800 text-2xl font-semibold">{product?.description}</p>
                        {/* <p className="text-gray-800 text-xl">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas vel ipsa asperiores recusandae dolorum. Eaque perspiciatis voluptatum, distinctio consequuntur, unde corporis obcaecati reiciendis ipsam voluptatem saepe fugiat quia, necessitatibus vitae minus amet odio? Soluta cum maiores delectus porro repellat possimus dicta quidem. Sunt est numquam odit necessitatibus quibusdam quasi vel. Repellendus voluptas, inventore eveniet, nesciunt aspernatur fugit eum itaque exercitationem debitis nemo vel similique dolorem ipsa dignissimos consequuntur. Molestiae sunt magni doloribus porro esse ad consectetur mollitia adipisci fugit blanditiis nesciunt repellendus accusantium dignissimos, quibusdam facere! Necessitatibus alias iure obcaecati? Est explicabo et, id tempora possimus repellendus laudantium voluptatum enim cum. Qui, voluptatibus fugiat culpa, illo eveniet impedit, vero deleniti natus numquam recusandae sequi hic voluptates beatae quia repudiandae facilis consequuntur odit accusantium exercitationem molestias repellendus fuga repellat! Aspernatur ullam sequi mollitia corporis assumenda sed molestias, modi eius ex maiores provident. Dolorum consequuntur voluptas, exercitationem accusamus veritatis possimus nesciunt excepturi rerum, laboriosam minima maxime facilis voluptate iusto. Error cumque repellendus aspernatur natus. Numquam alias natus vitae eligendi culpa? Nam aut possimus ipsa assumenda ipsam voluptatem consequuntur debitis corrupti in asperiores culpa sunt, aliquid eum eligendi sit excepturi voluptas. Magnam, sint aliquam voluptate accusantium corrupti a? Voluptatum repellendus maiores accusamus hic perferendis aut laudantium quod tempora sed, quos earum ad aperiam ullam! Vel facere tenetur debitis nisi saepe amet neque culpa, minima commodi omnis! Iusto, explicabo. Quibusdam laborum rem porro, sit deserunt architecto doloribus hic quo nam consectetur quisquam odio perferendis nisi adipisci ab earum beatae ipsam, voluptas culpa eaque cumque. Fugit delectus, debitis possimus nisi officia voluptatum in. Accusantium recusandae mollitia, itaque sunt iusto ullam voluptates! Dolorum quia suscipit numquam at quo ratione vitae libero, velit, officia illo odio molestias voluptatem consequuntur perspiciatis perferendis asperiores eum praesentium nemo tempore ipsam fugiat. Amet fugiat aperiam cum maxime maiores, ipsam nisi nobis sint praesentium magnam illo ut ad corporis aliquam consectetur dolorem officiis dicta beatae culpa nemo, eum ea consequuntur explicabo atque! Error dicta inventore quasi quo quam nostrum id corporis reiciendis delectus amet, repellat, nisi ex fuga illum veritatis asperiores eaque voluptate neque nesciunt ipsa molestiae sapiente? Fugit accusantium quidem id eius quae illum quam rem sunt dolor dolore atque praesentium, vero mollitia sed beatae laboriosam laudantium reiciendis cumque distinctio commodi dolorem. Cum iure aut incidunt fugiat beatae odit quis quod repellendus facere placeat explicabo animi, obcaecati impedit numquam similique repudiandae maxime itaque ullam eos eius, dignissimos ea? Quae nostrum libero harum vitae, ullam in eos perferendis voluptate ut sit assumenda sequi dignissimos enim omnis provident iusto facilis sint molestiae aspernatur optio repellat? Laborum reprehenderit accusantium eos molestiae, voluptatibus repellendus dolore vero, sapiente quasi officiis eaque? Rem optio dignissimos aliquid velit qui maiores dolores placeat harum nemo corrupti ea, quam explicabo ad numquam voluptatum amet inventore nulla modi sunt quia dicta nostrum officia! Numquam qui ipsum, ipsa provident iusto deleniti ratione illo aperiam itaque dignissimos? Dolorum non eum aspernatur consectetur, reiciendis recusandae voluptate! Doloribus dolor dignissimos totam quidem magnam eius quo nam dolore officia unde quibusdam alias dolorum sequi optio obcaecati recusandae itaque, excepturi illo vitae, dolores et aspernatur deserunt! Doloribus eveniet veniam dolorem veritatis, sit commodi incidunt blanditiis quia iusto eaque unde repudiandae sapiente est accusamus vel in tempora? Unde ad officia omnis deserunt reiciendis cumque autem, dolorum quam fugit, dignissimos perspiciatis totam magnam voluptas impedit tenetur harum ducimus ipsam ratione quaerat sint! Molestiae cumque ipsam alias ut recusandae architecto velit ad laborum fugiat cupiditate. Fugit quidem, in inventore id nesciunt assumenda soluta maxime hic consequuntur blanditiis placeat nam quisquam accusantium eos, quia molestias minima doloremque illum quo voluptate eius dolore facere velit magnam! Culpa, nisi vitae perferendis dolore tempore sed veritatis commodi sunt corrupti quaerat magni tenetur, quas ea magnam molestias nam iusto fugit temporibus dolor repudiandae explicabo illum recusandae pariatur hic. Magni nam quidem at nesciunt illo unde enim modi possimus aut. Iusto cupiditate ut corporis ducimus provident amet delectus. Ad alias laudantium dolore tempora voluptates itaque, asperiores cum atque, fugiat eaque qui debitis officiis sequi perferendis. Ipsam minima tenetur officia, ullam veniam ipsa, nulla earum architecto, natus quibusdam nisi provident necessitatibus minus consectetur sed sequi. Porro facere ab soluta accusamus minus facilis voluptatibus, velit aliquid mollitia eaque, tenetur, sequi id. Molestiae temporibus nulla, illum placeat possimus veritatis quaerat, itaque sit rerum expedita minima officia asperiores. Corporis sint sunt illum earum nulla nam fuga voluptatem quos magni provident et tenetur corrupti distinctio, autem iure. Iusto asperiores quidem cupiditate amet, exercitationem, natus cum labore fugit eos maxime architecto cumque ducimus voluptatibus ea voluptas consectetur quasi iste molestiae unde minus quam eaque enim consequatur. Saepe, quas impedit voluptatibus quo amet optio ipsum sequi rerum iusto obcaecati! Molestiae unde, nulla quos reprehenderit qui beatae velit eum minus voluptate consectetur sunt deleniti facere quae id ducimus porro in? Quas molestias nemo sint, dolore doloremque harum eius voluptas ullam itaque, consequuntur ipsum! Harum iusto perferendis animi quisquam repellat corporis amet sunt, nostrum obcaecati quidem provident mollitia molestiae et eaque quod beatae id doloribus. Ea tempora quas laudantium, ipsa ut accusantium nesciunt illo facere harum eos, nulla error quod eaque inventore explicabo beatae recusandae! Distinctio tempore deleniti animi impedit laudantium architecto rerum harum quis officiis commodi laborum illum, nisi illo neque quidem dolorum modi reiciendis asperiores blanditiis odit tenetur voluptates. Expedita, cumque aut. At aperiam beatae asperiores veritatis sed eum unde molestias maxime, consectetur ea consequatur id magni vero itaque dicta libero assumenda quibusdam ex perferendis quo labore aliquam autem? Tempore ipsum minus id labore magnam perspiciatis delectus fugit, expedita illum modi deleniti officia praesentium nihil. Vero, quasi odit. Aliquid asperiores repellat impedit! Possimus facilis quia harum, beatae nemo optio fuga velit pariatur exercitationem totam earum eum cum fugiat voluptates assumenda, alias sed, sunt deleniti! Ratione nobis iure ipsam in sint fugit eaque iusto fugiat quos, ipsum aliquam et assumenda, beatae voluptatem pariatur temporibus laudantium vitae quam! Cumque rerum consequatur eveniet a assumenda unde, ea recusandae incidunt ut aut fuga obcaecati nemo expedita voluptas asperiores iusto quasi voluptatum perspiciatis omnis corrupti cum molestiae nam necessitatibus illum. Ipsum nesciunt repudiandae voluptates iure officia non atque?</p> */}

                    </div>
                    <div className='col-span-1 md:col-span-2   '>
                        {/* Content for the third column */}
                        <div>
                            <p className="text-2xl font-bold text-black">สนใจสั่งซื้อสินค้าได้ที่นี่</p>
                            <div className=' text-center flex gap-2'>
                                <a className='' href='https://shop.line.me/@sungroup/' target='_blank' rel='noopener noreferrer'>
                                    <img
                                        src={bannerline}
                                        alt="Line Logo"
                                        className=' object-cover'
                                        style={{ width: '150px', height: '55px' }} // Adjust the values as needed
                                    />
                                </a>
                                <a href='https://shopee.co.th/sunfoodnae' target='_blank' rel='noopener noreferrer'>
                                    <img
                                        src={bannershopee}
                                        alt="Shopee Logo"
                                        className=' object-cover'
                                        style={{ width: '150px', height: '55px' }} // Adjust the values as needed
                                    />
                                </a>

                            </div>
                        </div>

                    </div>
                </div>
                {/* Add more details here */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose} className="bg-gray-500 text-white">
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

    );
};

export default ProductModal;
