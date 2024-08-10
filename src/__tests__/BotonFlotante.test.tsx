import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store'; 
import BotonFlotante from '../components/BotonFlotante';
import { describe } from 'node:test';


describe('BotonFlotante', () => {
    it('debe renderizar el botón', () => {
      render(
        <Provider store={store}>
          <BotonFlotante />
        </Provider>
      );
      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toBeInTheDocument();
      });

      it('debe mostrar el botón al desplazar más de 300px', () => {
        render(
          <Provider store={store}>
            <BotonFlotante />
          </Provider>
        );
      
        // Simular desplazamiento
        window.scrollTo = jest.fn(); // Mock para que no haga un scroll real
        window.pageYOffset = 301; // Seteamos la posición del scroll
      
        fireEvent.scroll(window);
      
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveStyle('opacity: 1');
      });

      it('debe ocultar el botón al desplazar menos de 300px', () => {
        render(
          <Provider store={store}>
            <BotonFlotante />
          </Provider>
        );
      
        // Simular desplazamiento a menos de 300px
        window.scrollTo = jest.fn(); // Mock para prevenir scroll real
        window.pageYOffset = 299; // Seteamos la posición del scroll
      
        fireEvent.scroll(window);
      
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveStyle('opacity: 0');
      });

      it('debe desplazar hacia arriba al hacer clic', () => {
        render(
          <Provider store={store}>
            <BotonFlotante />
          </Provider>
        );
      
        // Mock para window.scrollTo
        window.scrollTo = jest.fn();
      
        // Simular clic en el botón
        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);
      
        // Verificar que window.scrollTo haya sido llamado correctamente
        expect(window.scrollTo).toHaveBeenCalledWith({
          top: 0,
          behavior: "smooth",
        });
      });
  });