<template>
    <header id="header">
            <div class="center">
                <!-- LOGO -->
                <div id="logo">
                    <img src="../assets/logo.png" class="app-logo" alt="Logotipo" />
                    <span id="brand">
                        <strong>Musi</strong>carium
                    </span>
                </div>
                
                <!-- MENU -->
                <nav id="menu">
                    <ul>
                        <li>
                        <router-link to="/home" active-class="active">Inicio</router-link>
                        </li>
                        <li>
                            <router-link to="/Blog" active-class="active">Articulos</router-link>
                        </li>
                        <li>
                       <router-link to="/Cliente" active-class="active">Clientes</router-link>
                        </li>
                        <li>
                          <router-link to="/Factura" active-class="active">Facturas</router-link>

                        </li>
                                            
                    </ul>
                </nav>

                <!--LIMPIAR FLOTADOS-->
                <div class="clearfix"></div>
            </div>
        </header>

</template>

<script>
export default {
    name:'HeaderComponent'
}
</script>