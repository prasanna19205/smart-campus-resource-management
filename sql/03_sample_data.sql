
INSERT INTO app_user (full_name, email, role) VALUES
('Aarav Sharma', 'aarav@example.com', 'organizer'),
('Priya Reddy', 'priya@example.com', 'student'),
('Rahul Kumar', 'rahul@example.com', 'student'),
('Campus Admin', 'admin@example.com', 'admin');

INSERT INTO venue (venue_name, location, capacity) VALUES
('Seminar Hall A', 'Block A', 100),
('Computer Lab 1', 'Block B', 40),
('Auditorium', 'Main Block', 300);

INSERT INTO resource (resource_name, quantity, status) VALUES
('Projector', 3, 'available'),
('Microphone', 5, 'available'),
('Laptop', 10, 'available');

INSERT INTO campus_event
(event_name, description, organizer_id, start_time, end_time, capacity)
VALUES
('AI Workshop', 'Introduction to AI', 1,
 '2026-11-10 10:00', '2026-11-10 12:00', 80),
('Coding Contest', 'Campus coding competition', 1,
 '2026-11-12 14:00', '2026-11-12 17:00', 100);

INSERT INTO booking
(event_id, venue_id, start_time, end_time, status)
VALUES
(1, 1, '2026-11-10 10:00', '2026-11-10 12:00', 'confirmed'),
(2, 2, '2026-11-12 14:00', '2026-11-12 17:00', 'confirmed');

INSERT INTO registration (event_id, user_id) VALUES
(1, 2),
(1, 3),
(2, 2);

INSERT INTO maintenance
(resource_id, start_time, end_time, description)
VALUES
(3, '2026-11-15 09:00', '2026-11-15 12:00',
 'Scheduled laptop maintenance');

INSERT INTO feedback (event_id, user_id, rating, comments) VALUES
(1, 2, 5, 'Very informative workshop');
