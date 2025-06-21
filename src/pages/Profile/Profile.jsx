// src/pages/Profile/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebaseConfig';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css';

const db = getFirestore();

const interesesOpciones = [
    'Música', 'Deportes', 'Cultura', 'Tecnología', 'Arte', 'Fiestas',
    'Cine', 'Naturaleza', 'Gastronomía', 'Gaming'
];

const Profile = () => {
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        fechaNacimiento: '',
        ciudad: '',
        intereses: [],
        rol: 'user',
        verificado: false
    });

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setFormData((prev) => ({
                    ...prev,
                    email: currentUser.email
                }));
                localStorage.setItem('nombreUsuario', currentUser.displayName || '');
            } else {
                navigate('/login');
            }
        });

        return () => unsubscribe();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleInteres = (interes) => {
        setFormData((prev) => {
            const yaExiste = prev.intereses.includes(interes);
            return {
                ...prev,
                intereses: yaExiste
                    ? prev.intereses.filter(i => i !== interes)
                    : [...prev.intereses, interes]
            };
        });
    };

    const validar = () => {
        const newErrors = {};
        if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
        if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es requerido';
        if (!formData.fechaNacimiento) newErrors.fechaNacimiento = 'La fecha es requerida';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validar();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        try {
            const userDocRef = doc(db, 'usuarios', user.uid);
            await setDoc(userDocRef, {
                ...formData,
                uid: user.uid,
                mayorDeEdad: calcularMayorEdad(formData.fechaNacimiento)
            });

            toast.success('Perfil guardado correctamente');
            setTimeout(() => navigate('/home'), 2000);
        } catch (error) {
            toast.error('Error al guardar el perfil');
        }
    };

    const calcularMayorEdad = (fechaNac) => {
        const hoy = new Date();
        const nacimiento = new Date(fechaNac);
        const edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        return mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())
            ? edad - 1 >= 18
            : edad >= 18;
    };

    return (
        <div className="profile-bg">
            <ToastContainer />
            <div className="profile-card">
                <h2 className="profile-title">Completá tu perfil</h2>
                <form className="profile-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                    {errors.nombre && <p className="error">{errors.nombre}</p>}

                    <input
                        type="text"
                        name="apellido"
                        placeholder="Apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                    />
                    {errors.apellido && <p className="error">{errors.apellido}</p>}

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                    />

                    <input
                        type="date"
                        name="fechaNacimiento"
                        value={formData.fechaNacimiento}
                        onChange={handleChange}
                    />
                    {errors.fechaNacimiento && <p className="error">{errors.fechaNacimiento}</p>}

                    <input
                        type="text"
                        name="ciudad"
                        placeholder="Ciudad"
                        value={formData.ciudad}
                        onChange={handleChange}
                    />

                    <div className="intereses-group">
                        <label>Intereses:</label>
                        <div className="tags-container">
                            {interesesOpciones.map((tag) => (
                                <span
                                    key={tag}
                                    className={`tag ${formData.intereses.includes(tag) ? 'selected' : ''}`}
                                    onClick={() => toggleInteres(tag)}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">Guardar perfil</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
