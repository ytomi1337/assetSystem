<script setup>
import { ref, onMounted, onUnmounted} from 'vue'

import UserToUser from '@/components/actions/UserToUser.vue';
import TransferProtocol from './protocols/TransferProtocol.vue';
import ReturnProtocol from './protocols/ReturnProtocol.vue';

  const scorlledNav = ref(null)
  const mobileNav = ref(null)
  const mobile = ref(window.innerWidth <= 1050)
  const activeForm = ref(null);

  const disableActiveform = () =>{
    activeForm.value = null
  }

  const toggleForm = (formName) => {
    activeForm.value = activeForm.value === formName ? null : formName;
  };

  onMounted(() => {
    window.addEventListener("resize", checkMobile);
    window.addEventListener("scroll", updateScroll);
    document.addEventListener("click", closeMobileNavOnClickOutside);
  });
  onUnmounted(() => {
    window.removeEventListener("resize", checkMobile);
    window.removeEventListener("scroll", updateScroll);
    document.removeEventListener("click", closeMobileNavOnClickOutside);
  });

  const checkMobile = () => {
    mobile.value = window.innerWidth <= 1050;
    mobileNav.value =  mobileNav.value ? window.innerWidth <= 1050 : false
  };
  
  const updateScroll= () => {
    if(window.scrollY > 50){
      scorlledNav.value = true
      return;
    }

    scorlledNav.value = false
  }
  const toggleMobileNav = () =>{
    mobileNav.value = !mobileNav.value
  }

  const closeMobileNavOnClickOutside = (event) => {
    const dropdown = document.querySelector(".dropdown-nav");
    const menuIcon = document.querySelector(".icon i");

    if (
      mobileNav.value &&
      dropdown &&
      !dropdown.contains(event.target) &&
      !menuIcon.contains(event.target)
    ) {
      mobileNav.value = false;
    }
  };
</script>

<template>
  <header :class="{ 'scrolled-nav': scorlledNav }"> 
    <nav>
      <div class="branding">
        <RouterLink :to="{ name: 'home' }" class="navbar-brand me-5 ms-5" href="#">
          <img src="@/assets/Boerner-Insulation-Logo-2.png" alt="Boerner Insulation Logo">
        </RouterLink>
      </div>
      <ul v-show="!mobile" class="navigation">
        <li><RouterLink :to="{ name: 'asset-list' }" class="link" >Sprzęt IT</RouterLink></li>
        <li><RouterLink :to="{ name: 'phone-list' }" class="link" >Telefony</RouterLink></li>
        <li><RouterLink :to="{ name: '' }" class="link">Inwentaryzacja</RouterLink></li>
        
        <li class="dropdown">
          <button class="dropbtn">Akcje <i class="fa-solid fa-chevron-down"></i></button>
          <div class="dropdown-content">
            <a href="#" @click="toggleForm('userToUser')">Przekazanie Sprzętu między użytkownikami</a>
            <a href="#" @click="toggleForm('zwrot')">Przekazanie Telefonów między użytkownikami</a>
          </div>
        </li>
        
        <li class="dropdown">
          <button class="dropbtn">Protokoły <i class="fa-solid fa-chevron-down"></i></button>
          <div class="dropdown-content">
            <a href="#" @click="toggleForm('zwrot')">Protokół Przekazania</a>
            <a href="#" @click="toggleForm('przekazanie')">Protokół Zwortu</a>
          </div>
        </li>
      </ul>
      <div class="icon">
        <i @click="toggleMobileNav" v-show="mobile" :class="{'icon-active': mobileNav}" class="fa-solid fa-bars" ></i>
      </div>
      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
        <li><RouterLink :to="{ name: 'asset-list' }" class="link" >Sprzęt IT</RouterLink></li>
        <li><RouterLink :to="{ name: 'phone-list' }" class="link" >Telefony</RouterLink></li>
        <li><RouterLink :to="{ name: '' }" class="link" >Inwentaryzacja</RouterLink></li>
        <li class="dropdown">
          <button class="dropbtn">Akcje <i class="fa-solid fa-chevron-down"></i></button>
          <div class="dropdown-content">
            <a href="#">Przekazanie Sprzętu między użytkownikami</a>
            <a href="#">Przekazanie Telefonów między użytkownikami</a>
          </div>
        </li>
        
        <li class="dropdown">
          <button class="dropbtn">Protokoły <i class="fa-solid fa-chevron-down"></i></button>
          <div class="dropdown-content">
            <a href="#">Protokół Przekazania</a>
            <a href="#">Protokół Zwortu</a>
          </div>
        </li>
      </ul>
      </transition>
    </nav>
    <div class="corporate-border"></div>
    </header>
    
    <UserToUser 
        @disableWindow="disableActiveform" 
        v-if="activeForm === 'userToUser'">
        </UserToUser>

        <TransferProtocol
        @disableWindow="disableActiveform"
       
        v-if="activeForm === 'przekazanie'">
        </TransferProtocol>

        <ReturnProtocol
        @disableWindow="disableActiveform"
       
        v-if="activeForm === 'zwrot'">
        </ReturnProtocol>
</template>

<style scoped>
  header{
    background-color: rgb(255, 255, 255);
    z-index: 99;
    width: 100%;
    position: static;
    transition: .5s ease all;
    color: #000;

    nav{
      position: relative;
      display: flex;
      flex-direction: row;
      padding: 12px 0;
      transition: .5s ease all;
      width: 100%;
      margin: 0 auto;
      @media(min-width: 1150px){
        max-width: 1150px;
      }

      ul,
      .link{
        font-weight: 500;
        list-style: none;
        text-decoration: none;
        color: #000;
      }

      li{
        padding: 16px;
        gap:  16px;

        button{
          border: none;
          background-color: transparent;
          font-weight: 500;
          font-size: 17px;
        }
      }

      .link{
        font-size: 17px;
        transition: .5s ease all;
        border-bottom: 1px solid transparent;

        &:hover{
          color: #3f3b3b;
          border-bottom: 1px solid #3f3b3b;
        }
      }
    
      .branding{
        display: flex;
        align-items: center;

        img{
          transition: .5s ease all;
        }
      }
      .navigation{
        display: flex;
        align-items: center;
        flex: 1;
        justify-content: flex-end;
        
        .dropdown {
          position: relative;
          display: inline-block;
        }
        .dropdown-content{
          display: block;
          position: absolute;
          padding: 10px 15px;
          background-color: #fff;
          min-width: max-content;
          margin-top: 10px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 300;
          opacity: 0;
          height: 0px;
          overflow: hidden;
          transition: .5s ease-in-out all;
          border-bottom:1px solid #d3d3d3;
          box-shadow: 8px 8px 11px -12px rgba(66, 68, 90, 1);
          
        }
        .dropdown-content a{
          display: block;
          transition: .5s ease all;
          text-decoration: none;
          padding: 10px 0;
          color: #3b3a3a;
          border-bottom: 1px solid transparent; 
          transition: .5s ease all;
        }
        .dropdown-content a:hover {
          border-bottom: 1px solid #c0bfbf;
          color: #000000;
        }

        .dropdown:hover .dropdown-content{
          opacity: 1;
          height: auto;
        }
      }
      .icon{
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        right: 24px;
        height: 100%;
        
        i{
          cursor: pointer;
          font-size: 24px;
          transition: .8s ease all;
        }
      }

      .icon-active{
          transform: rotate(180deg);
        }

      .dropdown-nav{
        display: flex;
        flex-direction: column;
        position: fixed;
        width: 100%;
        max-width: 300px;
        height: 100%;
        background-color: #fff;
        top: 0;
        left: 0;

        .dropdown {
          position: relative;
          display: inline-block;
        }
        .dropdown-content{
          display: block;
          position: relative;
          background-color: #fff;
          min-width: max-content;
          margin-top: 10px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 300;
          opacity: 0;
          height: 0px;
          overflow: hidden;
          transition: .5s ease-in-out all;
        }
        .dropdown-content a{
          display: block;
          padding: 5px 0;
          transition: .5s ease all;
          text-decoration: none;
          color: #3b3a3a;
          border-bottom: 1px solid transparent; 
          transition: .5s ease all;
        }
        .dropdown-content a:hover {
          border-bottom: 1px solid #c0bfbf;
          color: #000000;
        }

        .dropdown:hover .dropdown-content{
          opacity: 1;
          height: auto;
        }

        li{
          margin-left: 0;
          .link{
            color: #000;
          }
        }
      }

      .mobile-nav-enter-active,
      .mobile-nav-leave-active{
        transition: 1s ease all;
      }

      .mobile-nav-enter-from,
      .mobile-nav-leave-to{
        transform: translateX(-250px);
      }

      .mobile-nav-enter-to{
        transform: translateX(0);
      }

    }
  }
  
  .scrolled-nav{
    background: #f5f4f4;
    box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);

    nav{
      padding: 8px 0;
    }
  }
  .corporate-border{
    display: block;
    height: 18px;
    background-image: linear-gradient(to right, #94c12e, #04bbf1, #1d4370)
  }
  @media only screen and (max-width: 600px) {
    .branding{
        img{
          width: 150px;
        }
      }
    }
</style>