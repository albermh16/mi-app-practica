import './Footer.css'

function Footer() {
  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <footer className="footer">
                    <div className="footer-content">
                            <div className="home_shipping_bg_bg">
                                <div className="col-xs-6 col-md-3">
                                    <p><img loading="lazy" src="https://www.hsnstore.com/skin/frontend/base/default/images/footer/Entrega.svg"  width="40" height="40" alt="Icono de una mano abierta con la palma hacia arriba sujetando un paquete"/></p>
                                    <p className="envios"><span>Envíos gratis y rápidos</span>Envío rapidísimo en 24/48 horas y gratis a partir de 29,99€</p>
                                    </div>
                                    <div className="col-xs-6 col-md-3">
                                    <p><img loading="lazy" src="https://www.hsnstore.com/skin/frontend/base/default/images/footer/Garantia.svg" width="40" height="40" alt="Icono de una mano con el pulgar hacia arriba dentro de un escudo"/></p>
                                    <p className="calidad"><span>Máxima calidad</span>Desarrollado por nuestro equipo de I+D+I y fabricado en nuestra propia fábrica</p>
                                    </div>
                                    <div className="col-xs-6 col-md-3">
                                    <p><img loading="lazy" src="https://www.hsnstore.com/skin/frontend/base/default/images/footer/Medioambiente.svg" width="40" height="40" alt="Icono de unas manos rodeando a la tierra"/></p>
                                    <p className="ofertas"><span>Sostenibilidad</span>Mejoramos progresivamente los procesos existentes para reducir nuestra huella medioambiental</p>
                                    </div>
                                    <div className="col-xs-6 col-md-3">
                                    <p><img loading="lazy" src="https://www.hsnstore.com/skin/frontend/base/default/images/footer/Materias.svg" width="40" height="40" alt="Icono de un papel desenrollado con una insignia encima representando un OK"/></p>
                                    <p className="plazos"><span>Materias Primas Premium</span>Utilizamos las mejores materias primas probadas y reconocidas por certificados de calidad</p>
                                </div>
                            </div>
                    </div>

                    <div className="container mt-4">
                        <div className="d-flex flex-row justify-content-between">
                            
                            <div className="">
                                <p className="footer_bottom_title">Métodos de pago</p>
                                <ul className="footer_list">
                                    <li className="payment-icon-item"><img loading="lazy" src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/footer_payment_logos/ES-mastercard.jpg" alt="ES-mastercard"/></li>
                                    <li className="payment-icon-item"><img loading="lazy" src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/footer_payment_logos/ES-visa.jpg" alt="ES-visa"/></li>
                                    <li className="payment-icon-item"><img loading="lazy" src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/footer_payment_logos/ES-maestro.jpg" alt="ES-maestro"/></li>
                                    <li className="payment-icon-item"><img loading="lazy" src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/footer_payment_logos/ES-amazon.jpg" alt="ES-amazon"/></li>
                                    <li className="payment-icon-item"><img loading="lazy" src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/footer_payment_logos/ES-redsys.jpg" alt="ES-redsys"/></li>
                                    <li className="payment-icon-item"><img loading="lazy" src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/footer_payment_logos/ES-cashondelivery.jpg" alt="ES-cashondelivery"/></li>
                                    <li className="payment-icon-item hidden"><img loading="lazy" src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/footer_payment_logos/ES-waylet.jpg" alt="ES-waylet"/></li>
                                    <li className="payment-icon-item hidden"><img loading="lazy" src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/footer_payment_logos/ES-banktransfer.jpg" alt="ES-banktransfer"/></li>
                                    <li className="payment-icon-item hidden"><img loading="lazy" src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/footer_payment_logos/ES-applepay.jpg" alt="ES-applepay"/></li>
                                    <li className="payment-icon-item hidden"><img loading="lazy" src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/footer_payment_logos/ES-paypal.jpg" alt="ES-paypal"/></li>
                                    <li className="payment-icon-item hidden"><img loading="lazy" src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/footer_payment_logos/ES-sequra.jpg" alt="ES-sequra"/></li>
                                    <div id="show-more-payment-icons" className="btn btn-default show-more-icons" title="Ver más métodos de envío" onclick="showMoreFooterIcons('payment')"> 
                                        <img loading="lazy" src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/footer_shipping_logos/show-more-icon.png" alt="Ver más métodos de envío" height="25" width="25"/>
                                    </div>                   
                                </ul>
                            </div>
                            <div className="">
                                <p className="footer_bottom_title">Métodos de envío</p>
                                <ul className="footer_list">
                                    <li className="shipping-icon-item icon-item"><img loading="lazy" src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/footer_shipping_logos/ES-correos.jpg" alt="ES-correos"/></li>
                                    <li className="shipping-icon-item icon-item"><img loading="lazy" src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/footer_shipping_logos/ES-correosexpress.jpg" alt="ES-correosexpress"/></li>
                                    <li className="shipping-icon-item icon-item"><img loading="lazy" src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/footer_shipping_logos/ES-gls.jpg" alt="ES-gls"/></li>
                                    <li className="shipping-icon-item icon-item"><img loading="lazy" src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/footer_shipping_logos/ES-fedex.jpg" alt="ES-fedex"/></li>
                                    <li className="shipping-icon-item icon-item"><img loading="lazy" src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/footer_shipping_logos/ES-mrw.jpg" alt="ES-mrw"/></li>
                                    <li className="shipping-icon-item icon-item"><img loading="lazy" src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/footer_shipping_logos/ES-spring.jpg" alt="ES-spring"/></li>
                                    <li className="shipping-icon-item icon-item hidden"><img loading="lazy" src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/footer_shipping_logos/ES-ups.jpg" alt="ES-ups"/></li>
                                    <li className="shipping-icon-item icon-item hidden"><img loading="lazy" src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/footer_shipping_logos/ES-dhl.jpg" alt="ES-dhl"/></li>
                                    <div id="show-more-shipping-icons" className="btn btn-default show-more-icons" title="Ver más métodos de envío" onclick="showMoreFooterIcons('shipping')"> 
                                        <img loading="lazy" src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/footer_shipping_logos/show-more-icon.png" alt="Ver más métodos de envío" height="25" width="25"/>
                                    </div> 
                                </ul>
                            </div>
                            <div className="">
                                <p className="footer_bottom_title">Seguridad web</p>
                                <ul className="footer_list">
                                    <li>
                                        <a target="_blank" href="//www.dmca.com/Protection/Status.aspx?ID=3093b29b-046d-4b44-9440-d10d2432fd9b">
                                            <img loading="lazy" src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/footer_web_security/DMCA.jpg" alt="DMCA logo"/>
                                        </a>
                                    </li>

                                    <li>
                                        <img loading="lazy" src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/footer_web_security/Geotrust.jpg" alt="Geotrust logo"/>
                                    </li>

                                    <li className="securetrust-icon">
                                        <script type="text/javascript" src="https://seal.securetrust.com/seal.js?style=invert&amp;code=cd3e6eedb4564f42a12d29422b29d9e5"></script><img id="vikingcloudSealImage" src="https://seal.securetrust.com/seal_image.php?customerId=cd3e6eedb4564f42a12d29422b29d9e5&amp;size=105x54&amp;style=invert" border="0" style={{cursor:"pointer"}} onclick="javascript:window.open('https://seal.securetrust.com/cert.php?customerId=cd3e6eedb4564f42a12d29422b29d9e5&amp;size=105x54&amp;style=invert', 'c_TW', 'location=no, toolbar=no, resizable=yes, scrollbars=yes, directories=no, status=no, width=615, height=720'); return false;" oncontextmenu="javascript:alert('Copying Prohibited by Law - Trusted Commerce is a Service Mark of Viking Cloud, Inc.'); return false;" alt="This site is protected by VikingCloud's Trusted Commerce program" title="This site is protected by VikingCloud's Trusted Commerce program"/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>                
            </div>
        </div>
    </div>
  );
}
export default Footer;